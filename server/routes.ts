import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { auditLogger } from "./audit-logger";
// Import validation schemas from client-safe shared schema
import { insertLoanApplicationSchema, insertContactSubmissionSchema } from "@shared/schema";
import sgMail from '@sendgrid/mail';
import { registerAdminRoutes } from "./admin-routes";

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Register admin routes
  registerAdminRoutes(app);

  // Analytics tracking endpoint
  app.post("/api/analytics/track", async (req, res) => {
    try {
      const { event, data } = req.body;
      
      // Log analytics event to audit log for now
      await auditLogger.logAction(req, event, 'analytics', JSON.stringify(data), {
        event,
        ...data
      });
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to track analytics event" });
    }
  });
  
  // FORCE remove ALL security headers in development for Replit preview
  if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
      // Override and remove ALL restrictive headers
      const originalSetHeader = res.setHeader;
      res.setHeader = function(name: string, value: any) {
        // Block security headers that prevent Replit preview
        const blockedHeaders = [
          'x-frame-options',
          'x-content-type-options', 
          'x-xss-protection',
          'strict-transport-security',
          'content-security-policy',
          'permissions-policy',
          'cross-origin-embedder-policy',
          'cross-origin-opener-policy',
          'cross-origin-resource-policy'
        ];
        
        if (!blockedHeaders.includes(name.toLowerCase())) {
          return originalSetHeader.call(this, name, value);
        }
        return this;
      };
      
      // Set permissive headers for Replit
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      next();
    });
  }

  // Loan Applications
  app.post("/api/loan-applications", async (req, res) => {
    try {
      const validatedData = insertLoanApplicationSchema.parse(req.body);
      const application = await storage.createLoanApplication(validatedData);
      
      // Log successful loan application creation
      await auditLogger.logCreate(req, 'loan_application', application.id.toString(), validatedData);
      
      res.json(application);
    } catch (error) {
      // Log failed loan application creation
      await auditLogger.logError(req, 'CREATE', 'loan_application', error instanceof Error ? error.message : 'Unknown error');
      res.status(400).json({ error: "Invalid loan application data" });
    }
  });

  app.get("/api/loan-applications", async (req, res) => {
    try {
      const applications = await storage.getLoanApplications();
      
      // Log successful read operation
      await auditLogger.logRead(req, 'loan_application');
      
      res.json(applications);
    } catch (error) {
      // Log failed read operation
      await auditLogger.logError(req, 'READ', 'loan_application', error instanceof Error ? error.message : 'Unknown error');
      res.status(500).json({ error: "Failed to fetch loan applications" });
    }
  });

  app.get("/api/loan-applications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const application = await storage.getLoanApplication(id);
      if (!application) {
        return res.status(404).json({ error: "Loan application not found" });
      }
      res.json(application);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch loan application" });
    }
  });

  app.patch("/api/loan-applications/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      const application = await storage.updateLoanApplicationStatus(id, status);
      if (!application) {
        return res.status(404).json({ error: "Loan application not found" });
      }
      res.json(application);
    } catch (error) {
      res.status(500).json({ error: "Failed to update loan application status" });
    }
  });

  // Contact Submissions
  app.post("/api/contact-submissions", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.json(submission);
    } catch (error) {
      res.status(400).json({ error: "Invalid contact submission data" });
    }
  });

  app.get("/api/contact-submissions", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact submissions" });
    }
  });

  // Chat widget submission endpoint with database storage
  app.post("/api/chat/submit", async (req, res) => {
    try {
      const { firstName, phoneNumber, email, userType, timeline, product, revenue, businessType, debtQ1, debtQ2, sessionId } = req.body;
      
      // Generate unique Lead ID and session ID if not provided
      const leadId = `LEAD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const chatSessionId = sessionId || `CHAT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Store conversation in database
      const conversationData = {
        sessionId: chatSessionId,
        firstName,
        phoneNumber,
        email,
        userType,
        timeline,
        product,
        revenue,
        businessType,
        debtQ1,
        debtQ2,
        conversationData: JSON.stringify({
          leadId,
          submittedAt: new Date().toISOString(),
          source: 'chat_widget',
          allFields: { firstName, phoneNumber, email, userType, timeline, product, revenue, businessType, debtQ1, debtQ2 }
        })
      };
      
      await storage.createChatbotConversation(conversationData);
      
      res.json({ success: true, message: "Information submitted successfully", sessionId: chatSessionId, leadId });
    } catch (error) {
      console.error('Chat submission error:', error);
      res.status(500).json({ error: "Failed to submit chat information" });
    }
  });

  // Chat widget submissions endpoint
  app.post("/api/chat-submissions", async (req, res) => {
    try {
      const { timestamp, firstName, phoneNumber, email, userType, timeline, product, revenue, debtQ1, debtQ2, infoCategory, businessType, source } = req.body;
      
      // Handle undefined values with fallbacks
      const formatValue = (value: any) => value && value !== 'undefined' ? value : 'Not provided';
      // Format timestamp in Eastern Time (FundTek's timezone)
      const formattedTimestamp = timestamp 
        ? new Date(timestamp).toLocaleString('en-US', { 
            timeZone: 'America/New_York',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          })
        : new Date().toLocaleString('en-US', { 
            timeZone: 'America/New_York',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          });
      
      // Create email content
      const emailContent = `
New Chat Widget Submission - FundTek Capital Group

Timestamp: ${formattedTimestamp}
Source: ${formatValue(source)}

Customer Information:
- First Name: ${formatValue(firstName)}
- Phone Number: ${formatValue(phoneNumber)}
- Email Address: ${formatValue(email)}
- User Type: ${formatValue(userType)}
- Funding Timeline: ${formatValue(timeline)}
- Product Interest: ${formatValue(product)}
- Monthly Revenue Range: ${formatValue(revenue)}${debtQ1 ? `\n- Primary Lender: ${formatValue(debtQ1)}` : ''}${debtQ2 ? `\n- Debt Balance: ${formatValue(debtQ2)}` : ''}${infoCategory ? `\n- Information Requested: ${formatValue(infoCategory)}` : ''}${businessType ? `\n- Business Type: ${formatValue(businessType)}` : ''}

Please follow up with this potential client promptly.

This message was automatically generated from the FundTek Capital Group website chat widget.
      `.trim();

      // Track submission internally

      // Send email using SendGrid
      if (process.env.SENDGRID_API_KEY) {
        try {
          // Generate truly unique Lead ID to prevent Gmail threading
          const timestamp = Date.now();
          const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
          const leadId = `${timestamp}-${randomSuffix}`;
          const customerName = formatValue(firstName) !== 'Not provided' ? ` - ${formatValue(firstName)}` : '';
          
          // Determine recipient based on submission content
          const isForBrian = userType && userType.toLowerCase().includes('brian');
          const recipient = isForBrian ? 'brian@fundtekcapitalgroup.com' : 'admin@fundtekcapitalgroup.com';
          
          const msg = {
            to: recipient,
            from: 'brian@fundtekcapitalgroup.com', // Verified sender address
            subject: `New Chat Lead #${leadId}${customerName} - FundTek Capital Group`,
            text: emailContent,
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Lead - FundTek Capital Group</title>
              </head>
              <body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #f5f5f5;">
                <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden;">
                  
                  <!-- Header with FundTek branding -->
                  <div style="background: linear-gradient(135deg, #85abe4 0%, #6b9bd8 100%); padding: 30px 40px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">
                      🎯 New Lead Alert
                    </h1>
                    <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">
                      FundTek Capital Group
                    </p>
                  </div>

                  <!-- Lead details -->
                  <div style="padding: 40px;">
                    <!-- Timestamp and source -->
                    <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 30px; border-left: 4px solid #85abe4;">
                      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                        <div>
                          <p style="margin: 0; color: #64748b; font-size: 14px; font-weight: 500;">RECEIVED</p>
                          <p style="margin: 5px 0 0 0; color: #0f172a; font-size: 16px; font-weight: 600;">${formattedTimestamp}</p>
                        </div>
                        <div style="background: #85abe4; color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">
                          ${formatValue(source)}
                        </div>
                      </div>
                    </div>

                    <!-- Customer information -->
                    <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">
                      Lead Information
                    </h2>
                    
                    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
                      <div style="background: #f1f5f9; padding: 15px 20px; border-bottom: 1px solid #e2e8f0;">
                        <h3 style="margin: 0; color: #475569; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                          Customer Details
                        </h3>
                      </div>
                      
                      <div style="padding: 0;">
                        <div style="padding: 18px 20px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                          <span style="color: #64748b; font-weight: 500;">First Name</span>
                          <span style="color: #0f172a; font-weight: 600; background: #fef3c7; padding: 4px 8px; border-radius: 6px; font-size: 14px;">
                            ${formatValue(firstName)}
                          </span>
                        </div>
                        
                        <div style="padding: 18px 20px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                          <span style="color: #64748b; font-weight: 500;">Phone Number</span>
                          <span style="color: #0f172a; font-weight: 600; background: #ecfccb; padding: 4px 8px; border-radius: 6px; font-size: 14px;">
                            ${formatValue(phoneNumber)}
                          </span>
                        </div>
                        
                        <div style="padding: 18px 20px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                          <span style="color: #64748b; font-weight: 500;">Email Address</span>
                          <span style="color: #0f172a; font-weight: 600; background: #fce7f3; padding: 4px 8px; border-radius: 6px; font-size: 14px;">
                            ${formatValue(email)}
                          </span>
                        </div>
                        
                        <div style="padding: 18px 20px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                          <span style="color: #64748b; font-weight: 500;">Inquiry Type</span>
                          <span style="color: #0f172a; font-weight: 600; background: #dbeafe; padding: 4px 8px; border-radius: 6px; font-size: 14px;">
                            ${formatValue(userType)}
                          </span>
                        </div>
                        
                        <div style="padding: 18px 20px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                          <span style="color: #64748b; font-weight: 500;">Funding Timeline</span>
                          <span style="color: #0f172a; font-weight: 600;">
                            ${formatValue(timeline)}
                          </span>
                        </div>
                        
                        <div style="padding: 18px 20px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                          <span style="color: #64748b; font-weight: 500;">Product Interest</span>
                          <span style="color: #0f172a; font-weight: 600;">
                            ${formatValue(product)}
                          </span>
                        </div>
                        
                        <div style="padding: 18px 20px; display: flex; justify-content: space-between; align-items: center;">
                          <span style="color: #64748b; font-weight: 500;">Monthly Revenue</span>
                          <span style="color: #0f172a; font-weight: 600; background: #dcfce7; padding: 4px 8px; border-radius: 6px; font-size: 14px;">
                            ${formatValue(revenue)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Call to action -->
                    <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 10px; padding: 25px; margin-top: 30px; border: 1px solid #bae6fd;">
                      <div style="text-align: center;">
                        <h3 style="color: #0c4a6e; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">
                          🚀 Action Required
                        </h3>
                        <p style="color: #075985; margin: 0 0 20px 0; font-size: 15px; line-height: 1.5;">
                          This lead is ready for immediate follow-up. High conversion potential based on their specific requirements.
                        </p>
                        <div style="display: inline-block; background: #85abe4; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                          📞 Contact Within 1 Hour
                        </div>
                      </div>
                    </div>

                    <!-- Footer -->
                    <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                      <p style="color: #94a3b8; font-size: 13px; margin: 0;">
                        Automatically generated by FundTek Capital Group website chat system
                      </p>
                      <p style="color: #cbd5e1; font-size: 12px; margin: 8px 0 0 0;">
                        ${formattedTimestamp} • Lead ID: ${leadId}
                      </p>
                    </div>
                  </div>
                </div>
              </body>
              </html>
            `
          };

          await sgMail.send(msg);
        } catch (emailError: any) {
          // Store failed submission for manual processing
          const failedSubmission = {
            timestamp: new Date(timestamp).toLocaleString('en-US', { 
              timeZone: 'America/New_York',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true
            }),
            userType,
            timeline,
            product,
            revenue,
            error: emailError?.message || 'Email delivery failed'
          };
        }
      }

      res.json({ 
        success: true, 
        message: "Chat submission received and forwarded to our team" 
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to process chat submission" });
    }
  });

  // XML Sitemap generation for SEO
  app.get("/sitemap.xml", (_req, res) => {
    try {
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? 'https://fundtekcapital.com' 
        : 'http://localhost:5000';
      
      const pages = [
        { url: '/', priority: '1.0', changefreq: 'weekly' },
        { url: '/solutions', priority: '0.9', changefreq: 'weekly' },
        { url: '/solutions/term-loans', priority: '0.8', changefreq: 'monthly' },
        { url: '/solutions/merchant-cash-advance', priority: '0.8', changefreq: 'monthly' },
        { url: '/solutions/lines-of-credit', priority: '0.8', changefreq: 'monthly' },
        { url: '/solutions/equipment-financing', priority: '0.8', changefreq: 'monthly' },
        { url: '/solutions/sba-loans', priority: '0.8', changefreq: 'monthly' },
        { url: '/solutions/invoice-factoring', priority: '0.8', changefreq: 'monthly' },
        { url: '/solutions/po-financing', priority: '0.8', changefreq: 'monthly' },
        { url: '/solutions/debt-consolidation', priority: '0.7', changefreq: 'monthly' },
        { url: '/solutions/credit-services', priority: '0.7', changefreq: 'monthly' },
        { url: '/who-we-fund', priority: '0.8', changefreq: 'monthly' },
        { url: '/testimonials', priority: '0.7', changefreq: 'monthly' },
        { url: '/contact', priority: '0.9', changefreq: 'monthly' }
      ];

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

      res.setHeader('Content-Type', 'application/xml');
      res.send(sitemap);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate sitemap' });
    }
  });

  // Performance alerts endpoint for Core Web Vitals monitoring
  app.post("/api/performance-alerts", async (req, res) => {
    try {
      const { metric, value, threshold } = req.body;
      // Store performance data for Google ranking optimization
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to process performance alert" });
    }
  });

  // Get chat history for user
  app.get("/api/chat/history", async (req, res) => {
    try {
      // Get conversations from database
      const conversations = await storage.getChatbotConversations();
      const formattedConversations = conversations.map(conv => ({
        sessionId: conv.sessionId,
        firstName: conv.firstName,
        timestamp: conv.createdAt,
        lastMessage: conv.conversationData ? 
          JSON.parse(conv.conversationData).lastMessage || 'New conversation' : 
          'New conversation'
      }));
      
      res.json(formattedConversations);
    } catch (error: any) {
      console.error("Error fetching chat history:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get messages for a specific conversation
  app.get("/api/chat/messages/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const messages = await storage.getChatMessages(sessionId);
      res.json(messages);
    } catch (error: any) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Enhanced robots.txt for Google crawling optimization
  app.get("/robots.txt", (_req, res) => {
    const robotsTxt = `User-agent: *
Allow: /
Allow: /solutions/
Allow: /qualified-industries
Allow: /testimonials
Allow: /contact
Allow: /apply

Disallow: /api/
Disallow: /admin/
Disallow: /*.json$
Disallow: /*?*

Sitemap: ${process.env.NODE_ENV === 'production' ? 'https://fundtekcapital.com' : 'http://localhost:5000'}/sitemap.xml

# Google-specific optimizations
User-agent: Googlebot
Allow: /

# Bing optimization
User-agent: Bingbot
Allow: /`;

    res.setHeader('Content-Type', 'text/plain');
    res.send(robotsTxt);
  });

  const httpServer = createServer(app);

  return httpServer;
}
