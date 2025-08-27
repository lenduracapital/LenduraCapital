import serverless from 'serverless-http';
import express from 'express';
import compression from 'compression';
import { storage } from '../server/storage';
import { insertLoanApplicationSchema, insertContactSubmissionSchema } from '../shared/schema';

const app = express();

// Middleware
app.use(express.json());
app.use(compression());

// CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

// Loan Applications
app.post('/api/loan-applications', async (req, res) => {
  try {
    const validatedData = insertLoanApplicationSchema.parse(req.body);
    const application = await storage.createLoanApplication(validatedData);
    console.log('Loan application created:', application.id);
    res.json(application);
  } catch (error) {
    console.error('Failed to create loan application:', error);
    res.status(400).json({ error: "Invalid loan application data" });
  }
});

app.get('/api/loan-applications', async (req, res) => {
  try {
    const applications = await storage.getLoanApplications();
    console.log('Loan applications fetched');
    res.json(applications);
  } catch (error) {
    console.error('Failed to fetch loan applications:', error);
    res.status(500).json({ error: "Failed to fetch loan applications" });
  }
});

app.get('/api/loan-applications/:id', async (req, res) => {
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

app.patch('/api/loan-applications/:id/status', async (req, res) => {
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
app.post('/api/contact-submissions', async (req, res) => {
  try {
    const validatedData = insertContactSubmissionSchema.parse(req.body);
    const submission = await storage.createContactSubmission(validatedData);
    res.json(submission);
  } catch (error) {
    res.status(400).json({ error: "Invalid contact submission data" });
  }
});

app.get('/api/contact-submissions', async (req, res) => {
  try {
    const submissions = await storage.getContactSubmissions();
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contact submissions" });
  }
});

export default serverless(app);