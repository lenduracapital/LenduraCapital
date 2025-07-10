import { Router } from 'express';
import { z } from 'zod';
import { storage } from '../../storage';
import { auditLogger } from '../../audit-logger';
import { catchAsync, AppError, HTTP_STATUS } from '../../middleware/error-handler';
import { createEncryptionMiddleware } from '../../middleware/encryption';
import { insertLoanApplicationSchema, insertContactSubmissionSchema } from '@shared/schema';

const router = Router();

// Encryption middleware for sensitive loan data
const loanEncryption = createEncryptionMiddleware(['ssn', 'bankAccount', 'routingNumber']);

/**
 * @swagger
 * /api/v1/loan-applications:
 *   post:
 *     summary: Create a new loan application
 *     tags: [Loan Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoanApplicationInput'
 *     responses:
 *       201:
 *         description: Loan application created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoanApplicationResponse'
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 */
router.post('/loan-applications', catchAsync(async (req, res) => {
  // Validate request body
  const validatedData = insertLoanApplicationSchema.parse(req.body);
  
  // Encrypt sensitive fields before storage
  const encryptedData = loanEncryption.encryptFields(validatedData);
  
  // Create loan application
  const application = await storage.createLoanApplication(encryptedData);
  
  // Log successful creation
  await auditLogger.logCreate(req, 'loan_application', application.id.toString(), {
    ...validatedData,
    // Mask sensitive data in audit logs
    ssn: validatedData.ssn ? '***-**-****' : undefined,
    bankAccount: validatedData.bankAccount ? '****' : undefined
  });
  
  // Decrypt for response and mask sensitive fields
  const decryptedApplication = loanEncryption.decryptFields(application);
  const maskedApplication = loanEncryption.maskFields(decryptedApplication, {
    ssn: 'ssn',
    bankAccount: 'account',
    routingNumber: 'routing'
  });
  
  res.status(HTTP_STATUS.CREATED).json({
    status: 'success',
    data: maskedApplication,
    message: 'Loan application created successfully'
  });
}));

/**
 * @swagger
 * /api/v1/loan-applications:
 *   get:
 *     summary: Get all loan applications
 *     tags: [Loan Applications]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Number of items per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected, funded]
 *         description: Filter by status
 *     responses:
 *       200:
 *         description: List of loan applications
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoanApplicationListResponse'
 */
router.get('/loan-applications', catchAsync(async (req, res) => {
  // Validate query parameters
  const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    status: z.enum(['pending', 'approved', 'rejected', 'funded']).optional()
  });
  
  const { page, limit, status } = querySchema.parse(req.query);
  
  // Get applications from storage
  const applications = await storage.getLoanApplications();
  
  // Filter by status if provided
  const filteredApplications = status 
    ? applications.filter(app => app.status === status)
    : applications;
  
  // Implement pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedApplications = filteredApplications.slice(startIndex, endIndex);
  
  // Decrypt and mask sensitive data for response
  const processedApplications = paginatedApplications.map(app => {
    const decrypted = loanEncryption.decryptFields(app);
    return loanEncryption.maskFields(decrypted, {
      ssn: 'ssn',
      bankAccount: 'account',
      routingNumber: 'routing'
    });
  });
  
  // Log read operation
  await auditLogger.logRead(req, 'loan_application');
  
  res.json({
    status: 'success',
    data: processedApplications,
    pagination: {
      page,
      limit,
      total: filteredApplications.length,
      pages: Math.ceil(filteredApplications.length / limit)
    }
  });
}));

/**
 * @swagger
 * /api/v1/loan-applications/{id}:
 *   get:
 *     summary: Get a specific loan application
 *     tags: [Loan Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Loan application ID
 *     responses:
 *       200:
 *         description: Loan application details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoanApplicationResponse'
 *       404:
 *         description: Loan application not found
 */
router.get('/loan-applications/:id', catchAsync(async (req, res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    throw new AppError('Invalid loan application ID', HTTP_STATUS.BAD_REQUEST, 'INVALID_ID');
  }
  
  const application = await storage.getLoanApplication(id);
  
  if (!application) {
    throw new AppError('Loan application not found', HTTP_STATUS.NOT_FOUND, 'RESOURCE_NOT_FOUND');
  }
  
  // Decrypt and mask sensitive data
  const decrypted = loanEncryption.decryptFields(application);
  const masked = loanEncryption.maskFields(decrypted, {
    ssn: 'ssn',
    bankAccount: 'account',
    routingNumber: 'routing'
  });
  
  // Log read operation
  await auditLogger.logRead(req, 'loan_application', id.toString());
  
  res.json({
    status: 'success',
    data: masked
  });
}));

/**
 * @swagger
 * /api/v1/loan-applications/{id}/status:
 *   patch:
 *     summary: Update loan application status
 *     tags: [Loan Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Loan application ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected, funded]
 *             required: [status]
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       404:
 *         description: Loan application not found
 */
router.patch('/loan-applications/:id/status', catchAsync(async (req, res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    throw new AppError('Invalid loan application ID', HTTP_STATUS.BAD_REQUEST, 'INVALID_ID');
  }
  
  const statusSchema = z.object({
    status: z.enum(['pending', 'approved', 'rejected', 'funded'])
  });
  
  const { status } = statusSchema.parse(req.body);
  
  // Get current application for audit trail
  const currentApplication = await storage.getLoanApplication(id);
  if (!currentApplication) {
    throw new AppError('Loan application not found', HTTP_STATUS.NOT_FOUND, 'RESOURCE_NOT_FOUND');
  }
  
  // Update status
  const updatedApplication = await storage.updateLoanApplicationStatus(id, status);
  
  if (!updatedApplication) {
    throw new AppError('Failed to update loan application', HTTP_STATUS.INTERNAL_SERVER_ERROR, 'UPDATE_FAILED');
  }
  
  // Log update operation
  await auditLogger.logUpdate(req, 'loan_application', id.toString(), 
    { status: currentApplication.status }, 
    { status }
  );
  
  res.json({
    status: 'success',
    data: updatedApplication,
    message: 'Status updated successfully'
  });
}));

/**
 * @swagger
 * /api/v1/contact-submissions:
 *   post:
 *     summary: Create a new contact submission
 *     tags: [Contact Submissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactSubmissionInput'
 *     responses:
 *       201:
 *         description: Contact submission created successfully
 */
router.post('/contact-submissions', catchAsync(async (req, res) => {
  const validatedData = insertContactSubmissionSchema.parse(req.body);
  
  const submission = await storage.createContactSubmission(validatedData);
  
  // Log creation
  await auditLogger.logCreate(req, 'contact_submission', submission.id.toString(), validatedData);
  
  res.status(HTTP_STATUS.CREATED).json({
    status: 'success',
    data: submission,
    message: 'Contact submission created successfully'
  });
}));

/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 version:
 *                   type: string
 *                   example: v1
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: 'v1',
    service: 'FundTek Capital Group API'
  });
});

export default router;