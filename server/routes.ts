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
      res.status(400).json({ error: "Invalid loan application data" });
    }
  });

  app.get("/api/loan-applications", async (req, res) => {
    try {
      const applications = await storage.getLoanApplications();
      res.json(applications);
    } catch (error) {
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

      // Send email using SendGrid
      if (process.env.SENDGRID_API_KEY) {
        try {
          const msg = {
            to: 'admin@fundtekcapitalgroup.com',
            from: 'brian@fundtekcapitalgroup.com',
            subject: 'New Chat Widget Lead - FundTek Capital Group',
            text: emailContent,
            html: `
              <h2>New Chat Widget Submission - FundTek Capital Group</h2>
              <p><strong>Timestamp:</strong> ${timestamp}</p>
              <p><strong>Source:</strong> ${source}</p>
              
              <h3>Customer Information:</h3>
              <ul>
                <li><strong>User Type:</strong> ${userType}</li>
                <li><strong>Funding Timeline:</strong> ${timeline}</li>
                <li><strong>Product Interest:</strong> ${product}</li>
                <li><strong>Monthly Revenue Range:</strong> ${revenue}</li>
              </ul>
              
              <p>Please follow up with this potential client promptly.</p>
              
              <hr>
              <p><em>This message was automatically generated from the FundTek Capital Group website chat widget.</em></p>
            `
          };
          
          await sgMail.send(msg);
        } catch (emailError: any) {
          console.error('Email delivery failed:', emailError);
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

  const httpServer = createServer(app);
  return httpServer;
}