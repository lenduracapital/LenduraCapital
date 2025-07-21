import type { Express } from "express";
import { storage } from "./storage";

// Basic admin functionality (foundation for CMS)
export function registerAdminRoutes(app: Express) {
  
  // Get audit logs endpoint
  app.get("/api/admin/audit-logs", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 100;
      const auditLogs = await storage.getAuditLogs(limit);
      res.json(auditLogs);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      res.status(500).json({ error: "Failed to fetch audit logs" });
    }
  });
  
  // Basic admin authentication middleware
  const requireAuth = (req: any, res: any, next: any) => {
    // Basic auth for now - can be enhanced with proper session management
    const auth = req.headers.authorization;
    
    if (!auth || !auth.startsWith('Basic ')) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const credentials = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':');
    const username = credentials[0];
    const password = credentials[1];
    
    // Simple auth - in production, use proper hashing and database storage
    if (username === 'admin' && password === 'fundtek2025') {
      next();
    } else {
      res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  };

  // Admin dashboard data
  app.get("/api/admin/dashboard", requireAuth, async (req, res) => {
    try {
      console.log('🔍 Admin dashboard: Starting data fetch...');
      
      // Test each storage method individually to identify issues
      let loanApplications: any[] = [];
      let contactSubmissions: any[] = [];
      let jotformSubmissions: any[] = [];
      let chatbotConversations: any[] = [];

      try {
        console.log('📋 Fetching loan applications...');
        loanApplications = await storage.getLoanApplications();
        console.log(`✅ Found ${loanApplications.length} loan applications`);
      } catch (error) {
        console.error('❌ Error fetching loan applications:', error);
      }

      try {
        console.log('📞 Fetching contact submissions...');
        contactSubmissions = await storage.getContactSubmissions();
        console.log(`✅ Found ${contactSubmissions.length} contact submissions`);
      } catch (error) {
        console.error('❌ Error fetching contact submissions:', error);
      }

      try {
        console.log('📝 Fetching jotform submissions...');
        jotformSubmissions = await storage.getJotformSubmissions();
        console.log(`✅ Found ${jotformSubmissions.length} jotform submissions`);
      } catch (error) {
        console.error('❌ Error fetching jotform submissions:', error);
      }

      try {
        console.log('💬 Fetching chatbot conversations...');
        chatbotConversations = await storage.getChatbotConversations();
        console.log(`✅ Found ${chatbotConversations.length} chatbot conversations`);
      } catch (error) {
        console.error('❌ Error fetching chatbot conversations:', error);
      }

      const stats = {
        totalLoanApplications: loanApplications.length,
        totalContactSubmissions: contactSubmissions.length,
        totalJotformSubmissions: jotformSubmissions.length,
        totalChatbotConversations: chatbotConversations.length,
        recentApplications: loanApplications.slice(-5),
        recentContacts: contactSubmissions.slice(-5),
        recentJotforms: jotformSubmissions.slice(-5),
        recentChats: chatbotConversations.slice(-5),
        conversionMetrics: {
          applicationsThisMonth: loanApplications.filter(app => 
            app.createdAt && new Date(app.createdAt).getMonth() === new Date().getMonth()
          ).length,
          contactsThisMonth: contactSubmissions.filter(contact => 
            contact.createdAt && new Date(contact.createdAt).getMonth() === new Date().getMonth()
          ).length,
          jotformsThisMonth: jotformSubmissions.filter(jotform => 
            jotform.createdAt && new Date(jotform.createdAt).getMonth() === new Date().getMonth()
          ).length,
          chatsThisMonth: chatbotConversations.filter(chat => 
            chat.createdAt && new Date(chat.createdAt).getMonth() === new Date().getMonth()
          ).length
        }
      };

      console.log('📊 Dashboard stats computed successfully');
      res.json(stats);
    } catch (error) {
      console.error('💥 Admin dashboard error:', error);
      res.status(500).json({ 
        error: "Failed to fetch admin dashboard data", 
        details: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  });

  // Admin loan applications management
  app.get("/api/admin/loan-applications", requireAuth, async (req, res) => {
    try {
      const applications = await storage.getLoanApplications();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch loan applications" });
    }
  });

  // Admin contact submissions management  
  app.get("/api/admin/contact-submissions", requireAuth, async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact submissions" });
    }
  });

  // Update loan application status
  app.patch("/api/admin/loan-applications/:id/status", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      const validStatuses = ['pending', 'approved', 'rejected', 'under-review'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      const application = await storage.updateLoanApplicationStatus(id, status);
      if (!application) {
        return res.status(404).json({ error: "Loan application not found" });
      }
      
      res.json(application);
    } catch (error) {
      res.status(500).json({ error: "Failed to update loan application status" });
    }
  });

  // Admin Jotform submissions management
  app.get("/api/admin/jotform-submissions", requireAuth, async (req, res) => {
    try {
      const submissions = await storage.getJotformSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch Jotform submissions" });
    }
  });

  // Admin chatbot conversations management
  app.get("/api/admin/chatbot-conversations", requireAuth, async (req, res) => {
    try {
      const conversations = await storage.getChatbotConversations();
      res.json(conversations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chatbot conversations" });
    }
  });

  // Update Jotform submission status
  app.patch("/api/admin/jotform-submissions/:id/status", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      const validStatuses = ['new', 'contacted', 'qualified', 'converted', 'closed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      const submission = await storage.updateJotformSubmissionStatus(id, status);
      if (!submission) {
        return res.status(404).json({ error: "Jotform submission not found" });
      }
      
      res.json(submission);
    } catch (error) {
      res.status(500).json({ error: "Failed to update Jotform submission status" });
    }
  });

  // Jotform webhook endpoint (for automatic data collection)
  app.post("/api/jotform/webhook", async (req, res) => {
    try {
      const submissionData = req.body;
      
      // Extract common fields from Jotform submission
      const parsedData = {
        submissionId: submissionData.submissionID || String(Date.now()),
        formId: submissionData.formID || 'unknown',
        formTitle: submissionData.formTitle || 'Unknown Form',
        firstName: submissionData.q3_firstName || submissionData.q3_name?.first || '',
        lastName: submissionData.q3_lastName || submissionData.q3_name?.last || '',
        email: submissionData.q4_email || submissionData.q4_emailAddress || '',
        phone: submissionData.q5_phone || submissionData.q5_phoneNumber || '',
        businessName: submissionData.q6_businessName || submissionData.q6_business || '',
        fundingAmount: submissionData.q7_fundingAmount || submissionData.q7_amount || '',
        businessType: submissionData.q8_businessType || submissionData.q8_type || '',
        rawData: JSON.stringify(submissionData)
      };

      const submission = await storage.createJotformSubmission(parsedData);
      res.json({ success: true, id: submission.id });
    } catch (error) {
      console.error('Jotform webhook error:', error);
      res.status(500).json({ error: "Failed to process Jotform submission" });
    }
  });

  // Performance metrics endpoint
  app.get("/api/admin/performance", requireAuth, async (req, res) => {
    try {
      // This would integrate with your analytics data
      const performanceData = {
        pageViews: 'Tracked via GA4',
        conversionRate: 'Calculate from applications/visits',
        averageSessionDuration: 'From analytics',
        topPages: 'From analytics data',
        userFlow: 'Conversion funnel data'
      };
      
      res.json(performanceData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch performance data" });
    }
  });




}