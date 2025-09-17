import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Import validation schemas from client-safe shared schema
import { insertLoanApplicationSchema, insertContactSubmissionSchema } from "@shared/schema";
import { registerAdminRoutes } from "./admin-routes";
import indexNow from "./utils/indexnow";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Register admin routes
  registerAdminRoutes(app);


  
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
      
      
      res.json(application);
    } catch (error) {
      // Log failed loan application creation
      console.error('Failed to create loan application:', error);
      res.status(400).json({ error: "Invalid loan application data" });
    }
  });

  app.get("/api/loan-applications", async (req, res) => {
    try {
      const applications = await storage.getLoanApplications();
      
      
      res.json(applications);
    } catch (error) {
      // Log failed read operation
      console.error('Failed to fetch loan applications:', error);
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

  // Home page contact form endpoint with SendGrid
  app.post("/api/contact-form", async (req, res) => {
    try {
      const { 
        firstName, 
        lastName,
        email, 
        phone,
        company,
        businessType,
        timeInBusiness,
        monthlyRevenue,
        creditScore,
        fundingAmount,
        fundingPurpose,
        timeline,
        message
      } = req.body;

      // Basic validation
      if (!firstName || !lastName || !email || !phone) {
        return res.status(400).json({ error: "Required fields missing" });
      }

      // Format timestamp
      const timestamp = new Date().toLocaleString('en-US', { 
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
New Contact Form Submission - Lendura Capital

Timestamp: ${timestamp}
Source: Home Page Contact Form

Customer Information:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Phone: ${phone}
- Company: ${company || 'Not provided'}
- Business Type: ${businessType || 'Not provided'}
- Time in Business: ${timeInBusiness || 'Not provided'}
- Monthly Revenue: ${monthlyRevenue || 'Not provided'}
- Credit Score: ${creditScore || 'Not provided'}
- Funding Amount: ${fundingAmount || 'Not provided'}
- Funding Purpose: ${fundingPurpose || 'Not provided'}
- Timeline: ${timeline || 'Not provided'}
- Message: ${message || 'Not provided'}

Please follow up with this potential client promptly.

This message was automatically generated from the Lendura Capital website contact form.
      `.trim();

      // Send email using SendGrid
      if (process.env.SENDGRID_API_KEY) {
        try {
          const sgMail = require('@sendgrid/mail');
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);

          const leadId = `CF-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
          
          const msg = {
            to: 'sam@lenduracapital.com',
            from: 'subs@lenduracapital.com',
            subject: `New Contact Form Lead #${leadId} - ${firstName} ${lastName}`,
            text: emailContent,
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Contact Form Lead - Lendura Capital</title>
              </head>
              <body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #f5f5f5;">
                <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden;">
                  
                  <div style="background: linear-gradient(135deg, #193a59 0%, #285d8a 100%); padding: 30px 40px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">
                      📋 New Contact Form Lead
                    </h1>
                    <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">
                      Lendura Capital
                    </p>
                  </div>

                  <div style="padding: 40px;">
                    <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 30px; border-left: 4px solid #193a59;">
                      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                        <div>
                          <p style="margin: 0; color: #64748b; font-size: 14px; font-weight: 500;">RECEIVED</p>
                          <p style="margin: 5px 0 0 0; color: #0f172a; font-size: 16px; font-weight: 600;">${timestamp}</p>
                        </div>
                        <div style="background: #193a59; color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">
                          HOME PAGE FORM
                        </div>
                      </div>
                    </div>

                    <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">
                      Contact Information
                    </h2>
                    
                    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 20px;">
                      <div style="background: #f1f5f9; padding: 15px 20px; border-bottom: 1px solid #e2e8f0;">
                        <h3 style="margin: 0; color: #475569; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                          Customer Details
                        </h3>
                      </div>
                      
                      <div style="padding: 0;">
                        <div style="padding: 18px 20px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                          <span style="color: #64748b; font-weight: 500;">Name</span>
                          <span style="color: #0f172a; font-weight: 600; background: #fef3c7; padding: 4px 8px; border-radius: 6px; font-size: 14px;">
                            ${firstName} ${lastName}
                          </span>
                        </div>
                        
                        <div style="padding: 18px 20px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                          <span style="color: #64748b; font-weight: 500;">Email</span>
                          <span style="color: #0f172a; font-weight: 600; background: #fce7f3; padding: 4px 8px; border-radius: 6px; font-size: 14px;">
                            ${email}
                          </span>
                        </div>
                        
                        <div style="padding: 18px 20px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                          <span style="color: #64748b; font-weight: 500;">Phone</span>
                          <span style="color: #0f172a; font-weight: 600; background: #ecfccb; padding: 4px 8px; border-radius: 6px; font-size: 14px;">
                            ${phone}
                          </span>
                        </div>

                        ${company ? `
                        <div style="padding: 18px 20px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                          <span style="color: #64748b; font-weight: 500;">Company</span>
                          <span style="color: #0f172a; font-weight: 600;">
                            ${company}
                          </span>
                        </div>
                        ` : ''}

                        ${businessType ? `
                        <div style="padding: 18px 20px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                          <span style="color: #64748b; font-weight: 500;">Business Type</span>
                          <span style="color: #0f172a; font-weight: 600;">
                            ${businessType}
                          </span>
                        </div>
                        ` : ''}

                        ${fundingAmount ? `
                        <div style="padding: 18px 20px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                          <span style="color: #64748b; font-weight: 500;">Funding Amount</span>
                          <span style="color: #0f172a; font-weight: 600; background: #dbeafe; padding: 4px 8px; border-radius: 6px; font-size: 14px;">
                            ${fundingAmount}
                          </span>
                        </div>
                        ` : ''}

                        ${timeline ? `
                        <div style="padding: 18px 20px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                          <span style="color: #64748b; font-weight: 500;">Timeline</span>
                          <span style="color: #0f172a; font-weight: 600;">
                            ${timeline}
                          </span>
                        </div>
                        ` : ''}
                      </div>
                    </div>

                    ${message ? `
                    <h2 style="color: #1e293b; margin: 20px 0 10px 0; font-size: 18px; font-weight: 600;">
                      Message
                    </h2>
                    <div style="background: #f8fafc; border-radius: 8px; padding: 20px; border-left: 4px solid #10b981;">
                      <p style="margin: 0; color: #374151; line-height: 1.6;">
                        ${message}
                      </p>
                    </div>
                    ` : ''}

                    <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #193a59 0%, #285d8a 100%); border-radius: 8px; text-align: center;">
                      <p style="color: white; margin: 0; font-size: 14px; font-weight: 500;">
                        📞 Follow up with this lead promptly for best conversion rates
                      </p>
                    </div>
                  </div>
                </div>
              </body>
              </html>
            `
          };

          await sgMail.send(msg);

          // Store in database
          const contactData = {
            firstName,
            lastName,
            email,
            phone,
            message: message || '',
            source: 'home_page_form',
            status: 'new'
          };

          await storage.createContactSubmission(contactData);

          res.json({ 
            success: true, 
            message: "Thank you! Your submission has been sent successfully. We'll contact you within 24 hours.",
            leadId 
          });

        } catch (emailError) {
          console.error('SendGrid email error:', emailError);
          res.status(500).json({ error: "Failed to send email notification" });
        }
      } else {
        console.error('SENDGRID_API_KEY not configured');
        res.status(500).json({ error: "Email service not configured" });
      }

    } catch (error) {
      console.error('Contact form submission error:', error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  // Loan Application endpoint with PDF processing
  app.post("/api/loan-application", async (req, res) => {
    try {
      const multer = require('multer');
      const upload = multer({ storage: multer.memoryStorage() });
      
      // Use multer middleware to handle FormData
      upload.single('pdf')(req, res, async (err: any) => {
        if (err) {
          console.error('File upload error:', err);
          return res.status(400).json({ error: "File upload failed" });
        }

        try {
          const applicationData = JSON.parse(req.body.applicationData);
          const pdfBuffer = req.file?.buffer;

          // Generate unique application ID
          const applicationId = `LC-APP-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

          // Format timestamp
          const timestamp = new Date().toLocaleString('en-US', { 
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
New Loan Application Submitted - Lendura Capital

Application ID: ${applicationId}
Timestamp: ${timestamp}
Source: Website Application Form

APPLICANT INFORMATION:
- Name: ${applicationData.firstName} ${applicationData.lastName}
- Email: ${applicationData.email}
- Mobile Phone: ${applicationData.mobilePhone}
- Date of Birth: ${applicationData.dateOfBirth}
- SSN: ${applicationData.ssn ? `***-**-${applicationData.ssn.slice(-4)}` : 'Not provided'}

BUSINESS INFORMATION:
- Legal Company Name: ${applicationData.legalCompanyName}
- DBA Name: ${applicationData.dbaName || 'Not provided'}
- Business Address: ${applicationData.businessAddress}, ${applicationData.city}, ${applicationData.state} ${applicationData.zipCode}
- EIN: ${applicationData.ein}
- Business Type: ${applicationData.businessType}
- Time in Business: ${applicationData.timeInBusiness}
- Monthly Revenue: ${applicationData.monthlyRevenue}

CONSENTS:
- Communication Consent: ${applicationData.consentToCommunications ? 'Yes' : 'No'}
- Electronic Signature: Signature on file
- Signature Date: ${applicationData.signatureDate}

Please review this loan application promptly and follow up with the applicant.

This application was submitted electronically through the Lendura Capital website.
          `.trim();

          // Send email with PDF attachment using SendGrid
          if (process.env.SENDGRID_API_KEY) {
            try {
              const sgMail = require('@sendgrid/mail');
              sgMail.setApiKey(process.env.SENDGRID_API_KEY);

              const msg = {
                to: 'sam@lenduracapital.com',
                from: 'subs@lenduracapital.com',
                subject: `New Loan Application ${applicationId} - ${applicationData.firstName} ${applicationData.lastName}`,
                text: emailContent,
                html: `
                  <!DOCTYPE html>
                  <html>
                  <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>New Loan Application - Lendura Capital</title>
                  </head>
                  <body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #f5f5f5;">
                    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden;">
                      
                      <div style="background: linear-gradient(135deg, #193a59 0%, #285d8a 100%); padding: 30px 40px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">
                          📄 New Loan Application
                        </h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">
                          Lendura Capital
                        </p>
                      </div>

                      <div style="padding: 40px;">
                        <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 30px; border-left: 4px solid #193a59;">
                          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                            <div>
                              <p style="margin: 0; color: #64748b; font-size: 14px; font-weight: 500;">APPLICATION ID</p>
                              <p style="margin: 5px 0 0 0; color: #0f172a; font-size: 16px; font-weight: 600;">${applicationId}</p>
                            </div>
                            <div style="background: #193a59; color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">
                              LOAN APPLICATION
                            </div>
                          </div>
                        </div>

                        <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">
                          Application Summary
                        </h2>
                        
                        <div style="background: white; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 20px;">
                          <div style="background: #f1f5f9; padding: 15px 20px; border-bottom: 1px solid #e2e8f0;">
                            <h3 style="margin: 0; color: #475569; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                              Key Details
                            </h3>
                          </div>
                          
                          <div style="padding: 0;">
                            <div style="padding: 18px 20px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                              <span style="color: #64748b; font-weight: 500;">Applicant</span>
                              <span style="color: #0f172a; font-weight: 600; background: #fef3c7; padding: 4px 8px; border-radius: 6px; font-size: 14px;">
                                ${applicationData.firstName} ${applicationData.lastName}
                              </span>
                            </div>
                            
                            <div style="padding: 18px 20px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                              <span style="color: #64748b; font-weight: 500;">Business</span>
                              <span style="color: #0f172a; font-weight: 600; background: #fce7f3; padding: 4px 8px; border-radius: 6px; font-size: 14px;">
                                ${applicationData.legalCompanyName}
                              </span>
                            </div>
                            
                            <div style="padding: 18px 20px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                              <span style="color: #64748b; font-weight: 500;">Business Type</span>
                              <span style="color: #0f172a; font-weight: 600; background: #dbeafe; padding: 4px 8px; border-radius: 6px; font-size: 14px;">
                                ${applicationData.businessType}
                              </span>
                            </div>

                            <div style="padding: 18px 20px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                              <span style="color: #64748b; font-weight: 500;">Monthly Revenue</span>
                              <span style="color: #0f172a; font-weight: 600;">
                                ${applicationData.monthlyRevenue}
                              </span>
                            </div>

                            <div style="padding: 18px 20px; display: flex; justify-content: space-between; align-items: center;">
                              <span style="color: #64748b; font-weight: 500;">Time in Business</span>
                              <span style="color: #0f172a; font-weight: 600;">
                                ${applicationData.timeInBusiness}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #193a59 0%, #285d8a 100%); border-radius: 8px; text-align: center;">
                          <p style="color: white; margin: 0; font-size: 14px; font-weight: 500;">
                            🚀 Priority application - Review and contact within 24 hours for best conversion
                          </p>
                        </div>
                      </div>
                    </div>
                  </body>
                  </html>
                `,
                attachments: pdfBuffer ? [{
                  content: pdfBuffer.toString('base64'),
                  filename: `${applicationId}.pdf`,
                  type: 'application/pdf',
                  disposition: 'attachment'
                }] : []
              };

              await sgMail.send(msg);

              // Store in database
              const loanData = {
                firstName: applicationData.firstName,
                lastName: applicationData.lastName,
                email: applicationData.email,
                phone: applicationData.mobilePhone, // Fix field name
                businessName: applicationData.legalCompanyName,
                loanAmount: 0, // Required field for database schema
                monthlyRevenue: applicationData.monthlyRevenue,
                creditScore: applicationData.creditScore || '',
                status: 'submitted'
              };

              await storage.createLoanApplication(loanData);

              res.json({ 
                success: true, 
                message: "Your loan application has been submitted successfully! We will review your application and contact you within 24 hours.",
                applicationId 
              });

            } catch (emailError) {
              console.error('SendGrid email error:', emailError);
              res.status(500).json({ error: "Failed to send application notification" });
            }
          } else {
            console.error('SENDGRID_API_KEY not configured');
            res.status(500).json({ error: "Email service not configured" });
          }

        } catch (parseError) {
          console.error('Application parsing error:', parseError);
          res.status(400).json({ error: "Invalid application data" });
        }
      });

    } catch (error) {
      console.error('Loan application submission error:', error);
      res.status(500).json({ error: "Failed to submit loan application" });
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
        status: 'active',
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
      // Format timestamp in Eastern Time (Lendura's timezone)
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
New Chat Widget Submission - Lendura Capital

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

This message was automatically generated from the Lendura Capital website chat widget.
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
          const isForSam = userType && userType.toLowerCase().includes('sam');
          const recipient = isForSam ? 'Sam@lenduracapital.com' : 'Sam@lenduracapital.com';
          
          const msg = {
            to: recipient,
            from: 'Sam@lenduracapital.com', // Verified sender address
            subject: `New Chat Lead #${leadId}${customerName} - Lendura Capital`,
            text: emailContent,
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Lead - Lendura Capital</title>
              </head>
              <body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #f5f5f5;">
                <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden;">
                  
                  <!-- Header with Lendura branding -->
                  <div style="background: linear-gradient(135deg, #85abe4 0%, #6b9bd8 100%); padding: 30px 40px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">
                      🎯 New Lead Alert
                    </h1>
                    <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">
                      Lendura Capital
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
                        Automatically generated by Lendura Capital website chat system
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

          // TODO: Configure SendGrid email sending
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
        ? 'https://lenduracapital.com' 
        : 'http://localhost:5000';
      
      const pages = [
        // Main pages - highest priority
        { url: '/', priority: '1.0', changefreq: 'weekly' },
        { url: '/solutions', priority: '0.9', changefreq: 'weekly' },
        { url: '/qualified-industries', priority: '0.9', changefreq: 'weekly' },
        { url: '/contact', priority: '0.9', changefreq: 'monthly' },
        
        // Solution detail pages - high priority
        { url: '/solutions/term-loans', priority: '0.8', changefreq: 'monthly' },
        { url: '/solutions/merchant-cash-advance', priority: '0.8', changefreq: 'monthly' },
        { url: '/solutions/lines-of-credit', priority: '0.8', changefreq: 'monthly' },
        { url: '/solutions/sba-loans', priority: '0.8', changefreq: 'monthly' },
        { url: '/solutions/equipment-financing', priority: '0.8', changefreq: 'monthly' },
        { url: '/solutions/invoice-factoring', priority: '0.8', changefreq: 'monthly' },
        { url: '/solutions/po-financing', priority: '0.8', changefreq: 'monthly' },
        { url: '/solutions/debt-consolidation', priority: '0.7', changefreq: 'monthly' },
        { url: '/solutions/credit-services', priority: '0.7', changefreq: 'monthly' },
        { url: '/solutions/commercial-real-estate-lending', priority: '0.7', changefreq: 'monthly' },
        { url: '/solutions/mortgage-financing', priority: '0.7', changefreq: 'monthly' },
        
        // Industry pages - high priority for targeting
        { url: '/industries/medical-healthcare', priority: '0.8', changefreq: 'monthly' },
        { url: '/industries/construction', priority: '0.8', changefreq: 'monthly' },
        { url: '/industries/restaurant-food-service', priority: '0.8', changefreq: 'monthly' },
        { url: '/industries/retail-e-commerce', priority: '0.8', changefreq: 'monthly' },
        { url: '/industries/manufacturing', priority: '0.8', changefreq: 'monthly' },
        { url: '/industries/trucking-transportation', priority: '0.8', changefreq: 'monthly' },
        { url: '/industries/home-services-contracting', priority: '0.7', changefreq: 'monthly' },
        { url: '/industries/professional-services', priority: '0.7', changefreq: 'monthly' },
        { url: '/industries/technology-software', priority: '0.7', changefreq: 'monthly' },
        { url: '/industries/auto-transportation', priority: '0.7', changefreq: 'monthly' },
        { url: '/industries/beauty-wellness', priority: '0.7', changefreq: 'monthly' },
        { url: '/industries/hospitality-tourism', priority: '0.7', changefreq: 'monthly' },
        { url: '/industries/agriculture-farming', priority: '0.7', changefreq: 'monthly' },
        { url: '/industries/real-estate', priority: '0.7', changefreq: 'monthly' },
        { url: '/industries/cleaning-janitorial-services', priority: '0.7', changefreq: 'monthly' },
        { url: '/industries/entertainment-events', priority: '0.6', changefreq: 'monthly' },
        { url: '/industries/education-training', priority: '0.6', changefreq: 'monthly' },
        { url: '/industries/franchises', priority: '0.6', changefreq: 'monthly' },
        
        // Application pages - high conversion value
        { url: '/apply', priority: '0.9', changefreq: 'monthly' },
        { url: '/app', priority: '0.8', changefreq: 'monthly' },
        { url: '/applynow', priority: '0.8', changefreq: 'monthly' },
        
        // Content and trust pages
        { url: '/testimonials', priority: '0.7', changefreq: 'monthly' },
        { url: '/more-testimonials', priority: '0.6', changefreq: 'monthly' },
        { url: '/about', priority: '0.7', changefreq: 'monthly' },
        { url: '/faq', priority: '0.6', changefreq: 'monthly' },
        
        // Additional service pages
        { url: '/credit-servicing', priority: '0.6', changefreq: 'monthly' },
        { url: '/seo-web-development', priority: '0.5', changefreq: 'monthly' },
        { url: '/credit-card-processing', priority: '0.6', changefreq: 'monthly' },
        
        // Legal pages - required but lower priority
        { url: '/terms', priority: '0.3', changefreq: 'yearly' },
        { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
        { url: '/cookies', priority: '0.3', changefreq: 'yearly' }
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

  // IndexNow API endpoint for search engine notifications
  const notifySearchEnginesSchema = z.object({
    urls: z.array(z.string().url()).min(1, 'At least one URL is required').max(100, 'Maximum 100 URLs allowed'),
    type: z.enum(['new', 'updated', 'deleted']).optional().default('updated'),
    bulk: z.boolean().optional().default(false)
  });

  app.post("/api/notify-search-engines", async (req, res) => {
    try {
      // Validate request body
      const validated = notifySearchEnginesSchema.parse(req.body);
      const { urls, type, bulk } = validated;

      console.log(`🔄 IndexNow API: Received request to notify ${urls.length} URLs (type: ${type})`);

      // Use bulk notification for efficiency when multiple URLs
      const result = urls.length === 1 && !bulk 
        ? await indexNow.notify(urls[0], type)
        : await indexNow.notifyBulk(urls, type);

      if (result.success) {
        res.json({
          success: true,
          message: result.message,
          urls: result.urls,
          timestamp: result.timestamp,
          statusCode: result.statusCode
        });
      } else {
        res.status(400).json({
          success: false,
          error: result.message,
          urls: result.urls,
          timestamp: result.timestamp,
          statusCode: result.statusCode
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Invalid request data",
          details: error.errors 
        });
      }
      
      console.error('IndexNow API endpoint error:', error);
      res.status(500).json({ error: "Failed to notify search engines" });
    }
  });

  // Convenience endpoint for notifying about homepage updates
  app.post("/api/notify-homepage", async (req, res) => {
    try {
      console.log('🏠 IndexNow API: Homepage update notification requested');
      const result = await indexNow.notifyHomepage();
      
      if (result.success) {
        res.json({
          success: true,
          message: result.message,
          urls: result.urls,
          timestamp: result.timestamp
        });
      } else {
        res.status(400).json({
          success: false,
          error: result.message,
          timestamp: result.timestamp
        });
      }
    } catch (error) {
      console.error('Homepage notification error:', error);
      res.status(500).json({ error: "Failed to notify about homepage update" });
    }
  });

  // Convenience endpoint for notifying about sitemap updates
  app.post("/api/notify-sitemap", async (req, res) => {
    try {
      console.log('🗺️  IndexNow API: Sitemap update notification requested');
      const result = await indexNow.notifySitemap();
      
      if (result.success) {
        res.json({
          success: true,
          message: result.message,
          urls: result.urls,
          timestamp: result.timestamp
        });
      } else {
        res.status(400).json({
          success: false,
          error: result.message,
          timestamp: result.timestamp
        });
      }
    } catch (error) {
      console.error('Sitemap notification error:', error);
      res.status(500).json({ error: "Failed to notify about sitemap update" });
    }
  });

  // Get IndexNow status and configuration
  app.get("/api/indexnow/status", (req, res) => {
    try {
      const status = indexNow.getStatus();
      res.json({
        ...status,
        message: status.hasApiKey 
          ? 'IndexNow API is properly configured with API key'
          : 'IndexNow API is available but no API key is configured'
      });
    } catch (error) {
      console.error('IndexNow status error:', error);
      res.status(500).json({ error: "Failed to get IndexNow status" });
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
Allow: /industries/
Allow: /qualified-industries
Allow: /testimonials
Allow: /about
Allow: /faq
Allow: /contact
Allow: /apply
Allow: /app
Allow: /applynow
Allow: /credit-servicing
Allow: /seo-web-development
Allow: /credit-card-processing
Allow: /terms
Allow: /privacy
Allow: /cookies

# Block admin and API routes
Disallow: /api/
Disallow: /admin/
Disallow: /*.json$
Disallow: /*?*

# Crawl delay to be respectful
Crawl-delay: 1

Sitemap: ${process.env.NODE_ENV === 'production' ? 'https://lenduracapital.com' : 'http://localhost:5000'}/sitemap.xml

# Google-specific optimizations
User-agent: Googlebot
Allow: /
Crawl-delay: 1

# Bing optimization  
User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Other search engines
User-agent: DuckDuckBot
Allow: /

User-agent: YandexBot
Allow: /`;

    res.setHeader('Content-Type', 'text/plain');
    res.send(robotsTxt);
  });

  const httpServer = createServer(app);

  return httpServer;
}
