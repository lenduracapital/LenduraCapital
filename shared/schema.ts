// Database schema and type definitions
import { z } from "zod";
import { pgTable, text, serial, integer, boolean, varchar, timestamp } from "drizzle-orm/pg-core";

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

// Database table definitions (for Drizzle schema generation)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const loanApplications = pgTable("loan_applications", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  businessName: varchar("business_name", { length: 255 }).notNull(),
  businessType: varchar("business_type", { length: 100 }),
  yearsInBusiness: integer("years_in_business"),
  monthlyRevenue: integer("monthly_revenue"),
  loanAmount: integer("loan_amount").notNull(),
  loanPurpose: text("loan_purpose"),
  creditScore: integer("credit_score"),
  status: varchar("status", { length: 50 }).default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  fundingAmount: varchar("funding_amount", { length: 50 }),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const jotformSubmissions = pgTable("jotform_submissions", {
  id: serial("id").primaryKey(),
  submissionId: varchar("submission_id", { length: 100 }).unique().notNull(),
  formId: varchar("form_id", { length: 100 }).notNull(),
  formTitle: varchar("form_title", { length: 255 }),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  businessName: varchar("business_name", { length: 255 }),
  fundingAmount: varchar("funding_amount", { length: 100 }),
  businessType: varchar("business_type", { length: 100 }),
  rawData: text("raw_data"),
  status: varchar("status", { length: 50 }).default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const chatbotConversations = pgTable("chatbot_conversations", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 100 }).unique().notNull(),
  firstName: varchar("first_name", { length: 100 }),
  phoneNumber: varchar("phone_number", { length: 20 }),
  email: varchar("email", { length: 255 }),
  userType: varchar("user_type", { length: 100 }),
  timeline: varchar("timeline", { length: 100 }),
  product: varchar("product", { length: 100 }),
  revenue: varchar("revenue", { length: 100 }),
  businessType: varchar("business_type", { length: 100 }),
  debtQ1: varchar("debt_q1", { length: 100 }),
  debtQ2: varchar("debt_q2", { length: 100 }),
  conversationData: text("conversation_data"),
  status: varchar("status", { length: 50 }).default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  conversationId: varchar("conversation_id", { length: 100 }).notNull(),
  messageId: varchar("message_id", { length: 100 }).notNull(),
  text: text("text").notNull(),
  sender: varchar("sender", { length: 10 }).notNull(),
  timestamp: timestamp("timestamp").notNull(),
});

export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  action: varchar("action", { length: 50 }).notNull(),
  resource: varchar("resource", { length: 100 }).notNull(),
  resourceId: varchar("resource_id", { length: 100 }),
  oldValues: text("old_values"),
  newValues: text("new_values"),
  ipAddress: varchar("ip_address", { length: 45 }).notNull(),
  userAgent: text("user_agent"),
  sessionId: varchar("session_id", { length: 100 }),
  success: boolean("success").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
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


