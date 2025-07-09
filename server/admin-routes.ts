import type { Express } from "express";
import { storage } from "./storage";

// Basic admin functionality (foundation for CMS)
export function registerAdminRoutes(app: Express) {
  
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
      const [loanApplications, contactSubmissions] = await Promise.all([
        storage.getLoanApplications(),
        storage.getContactSubmissions()
      ]);

      const stats = {
        totalLoanApplications: loanApplications.length,
        totalContactSubmissions: contactSubmissions.length,
        recentApplications: loanApplications.slice(-5),
        recentContacts: contactSubmissions.slice(-5),
        conversionMetrics: {
          applicationsThisMonth: loanApplications.filter(app => 
            new Date(app.createdAt).getMonth() === new Date().getMonth()
          ).length,
          contactsThisMonth: contactSubmissions.filter(contact => 
            new Date(contact.createdAt).getMonth() === new Date().getMonth()
          ).length
        }
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch admin dashboard data" });
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