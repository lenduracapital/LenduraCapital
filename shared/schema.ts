// Client-safe type definitions - no drizzle-orm imports
import { z } from "zod";

// Zod schemas for validation (client-safe)
export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const insertLoanApplicationSchema = z.object({
  firstName: z.string().max(100),
  lastName: z.string().max(100),
  email: z.string().email().max(255),
  phone: z.string().max(20).optional(),
  businessName: z.string().max(255),
  businessType: z.string().max(100).optional(),
  yearsInBusiness: z.number().optional(),
  monthlyRevenue: z.number().optional(),
  loanAmount: z.number(),
  loanPurpose: z.string().optional(),
  creditScore: z.number().optional(),
  status: z.string().max(50).default("pending"),
});

export const insertContactSubmissionSchema = z.object({
  firstName: z.string().max(100),
  lastName: z.string().max(100),
  email: z.string().email().max(255),
  phone: z.string().max(20).optional(),
  fundingAmount: z.string().max(50).optional(),
  message: z.string().optional(),
});

export const insertJotformSubmissionSchema = z.object({
  submissionId: z.string().max(100),
  formId: z.string().max(100),
  formTitle: z.string().max(255).optional(),
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  email: z.string().email().max(255).optional(),
  phone: z.string().max(20).optional(),
  businessName: z.string().max(255).optional(),
  fundingAmount: z.string().max(100).optional(),
  businessType: z.string().max(100).optional(),
  rawData: z.string().optional(),
  status: z.string().max(50).default("new"),
});

export const insertChatbotConversationSchema = z.object({
  sessionId: z.string().max(100),
  firstName: z.string().max(100).optional(),
  phoneNumber: z.string().max(20).optional(),
  email: z.string().email().max(255).optional(),
  userType: z.string().max(100).optional(),
  timeline: z.string().max(100).optional(),
  product: z.string().max(100).optional(),
  revenue: z.string().max(100).optional(),
  businessType: z.string().max(100).optional(),
  debtQ1: z.string().max(100).optional(),
  debtQ2: z.string().max(100).optional(),
  conversationData: z.string().optional(),
  status: z.string().max(50).default("active"),
});

export const insertAuditLogSchema = z.object({
  userId: z.number().optional(),
  action: z.string().max(50),
  resource: z.string().max(100),
  resourceId: z.string().max(100).optional(),
  oldValues: z.string().optional(),
  newValues: z.string().optional(),
  ipAddress: z.string().max(45),
  userAgent: z.string().optional(),
  sessionId: z.string().max(100).optional(),
  success: z.boolean().default(true),
  errorMessage: z.string().optional(),
});



// Type definitions
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = {
  id: number;
  username: string;
  password: string;
};

export type InsertLoanApplication = z.infer<typeof insertLoanApplicationSchema>;
export type LoanApplication = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  businessName: string;
  businessType: string | null;
  yearsInBusiness: number | null;
  monthlyRevenue: number | null;
  loanAmount: number;
  loanPurpose: string | null;
  creditScore: number | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  fundingAmount: string | null;
  message: string | null;
  createdAt: Date;
};

export type InsertJotformSubmission = z.infer<typeof insertJotformSubmissionSchema>;
export type JotformSubmission = {
  id: number;
  submissionId: string;
  formId: string;
  formTitle: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  businessName: string | null;
  fundingAmount: string | null;
  businessType: string | null;
  rawData: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type InsertChatbotConversation = z.infer<typeof insertChatbotConversationSchema>;
export type ChatbotConversation = {
  id: number;
  sessionId: string;
  firstName: string | null;
  phoneNumber: string | null;
  email: string | null;
  userType: string | null;
  timeline: string | null;
  product: string | null;
  revenue: string | null;
  businessType: string | null;
  debtQ1: string | null;
  debtQ2: string | null;
  conversationData: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type InsertAuditLog = z.infer<typeof insertAuditLogSchema>;
export type AuditLog = {
  id: number;
  userId: number | null;
  action: string;
  resource: string;
  resourceId: string | null;
  oldValues: string | null;
  newValues: string | null;
  ipAddress: string;
  userAgent: string | null;
  sessionId: string | null;
  success: boolean;
  errorMessage: string | null;
  createdAt: Date;
};


