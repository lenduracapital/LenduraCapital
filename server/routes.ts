import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLoanApplicationSchema, insertContactSubmissionSchema } from "@shared/schema";

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

  // XML Sitemap generation for SEO
  app.get("/sitemap.xml", (_req: Request, res: Response) => {
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
    res.status(200).send(sitemap);
  });

  const httpServer = createServer(app);

  return httpServer;
}
