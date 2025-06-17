import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLoanApplicationSchema, insertContactSubmissionSchema } from "@shared/schema";
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Loan Applications
  app.post("/api/loan-applications", async (req, res) => {
    try {
      const validatedData = insertLoanApplicationSchema.parse(req.body);
      const application = await storage.createLoanApplication(validatedData);
      res.json(application);
    } catch (error) {
      console.error("Error creating loan application:", error);
      res.status(400).json({ error: "Invalid loan application data" });
    }
  });

  app.get("/api/loan-applications", async (req, res) => {
    try {
      const applications = await storage.getLoanApplications();
      res.json(applications);
    } catch (error) {
      console.error("Error fetching loan applications:", error);
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
      console.error("Error fetching loan application:", error);
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
      console.error("Error updating loan application status:", error);
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
      console.error("Error creating contact submission:", error);
      res.status(400).json({ error: "Invalid contact submission data" });
    }
  });

  app.get("/api/contact-submissions", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ error: "Failed to fetch contact submissions" });
    }
  });

  // Chat widget submissions endpoint
  app.post("/api/chat-submissions", async (req, res) => {
    try {
      const { timestamp, userType, timeline, product, revenue, source } = req.body;
      
      // Create email content
      const emailContent = `
New Chat Widget Submission - FundTek Capital Group

Timestamp: ${timestamp}
Source: ${source}

Customer Information:
- User Type: ${userType}
- Funding Timeline: ${timeline}
- Product Interest: ${product}
- Monthly Revenue Range: ${revenue}

Please follow up with this potential client promptly.

This message was automatically generated from the FundTek Capital Group website chat widget.
      `.trim();

      // Log the submission for tracking
      console.log('Chat submission received:', {
        timestamp,
        userType,
        timeline,
        product,
        revenue
      });

      // Send email using SendGrid
      if (process.env.SENDGRID_API_KEY) {
        try {
          const msg = {
            to: 'Brian@fundtekcapitalgroup.com',
            from: 'noreply@sendgrid.net', // Using SendGrid's sandbox domain
            subject: 'New Chat Widget Lead - FundTek Capital Group',
            text: emailContent,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #1E88E5; border-bottom: 2px solid #1E88E5; padding-bottom: 10px;">
                  New Chat Widget Submission - FundTek Capital Group
                </h2>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p><strong>Timestamp:</strong> ${new Date(timestamp).toLocaleString()}</p>
                  <p><strong>Source:</strong> ${source}</p>
                </div>

                <h3 style="color: #333;">Customer Information:</h3>
                <ul style="line-height: 1.6;">
                  <li><strong>User Type:</strong> ${userType}</li>
                  <li><strong>Funding Timeline:</strong> ${timeline}</li>
                  <li><strong>Product Interest:</strong> ${product}</li>
                  <li><strong>Monthly Revenue Range:</strong> ${revenue}</li>
                </ul>

                <div style="background: #e3f2fd; border-left: 4px solid #1E88E5; padding: 15px; margin: 20px 0;">
                  <p style="margin: 0; font-weight: bold;">Please follow up with this potential client promptly.</p>
                </div>

                <p style="color: #666; font-size: 12px; margin-top: 30px;">
                  This message was automatically generated from the FundTek Capital Group website chat widget.
                </p>
              </div>
            `
          };

          await sgMail.send(msg);
          console.log('Email sent successfully to Brian@fundtekcapitalgroup.com');
        } catch (emailError) {
          console.error('SendGrid email error:', emailError);
          // Continue with success response even if email fails
        }
      } else {
        console.log('SendGrid not configured, email content logged to console:');
        console.log(emailContent);
      }

      res.json({ 
        success: true, 
        message: "Chat submission received and forwarded to our team" 
      });
    } catch (error) {
      console.error("Error processing chat submission:", error);
      res.status(500).json({ error: "Failed to process chat submission" });
    }
  });

  // XML Sitemap generation for SEO
  app.get("/sitemap.xml", (_req: Request, res: Response) => {
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

      res.writeHead(200, { 'Content-Type': 'application/xml' });
      res.end(sitemap);
    } catch (error) {
      console.error('Sitemap generation error:', error);
      res.status(500).json({ error: 'Failed to generate sitemap' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
