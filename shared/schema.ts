import { pgTable, text, serial, integer, boolean, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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
  rawData: text("raw_data"), // Store complete JSON from Jotform
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
  conversationData: text("conversation_data"), // Store complete conversation JSON
  status: varchar("status", { length: 50 }).default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLoanApplicationSchema = createInsertSchema(loanApplications).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

export const insertJotformSubmissionSchema = createInsertSchema(jotformSubmissions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertChatbotConversationSchema = createInsertSchema(chatbotConversations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertLoanApplication = z.infer<typeof insertLoanApplicationSchema>;
export type LoanApplication = typeof loanApplications.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertJotformSubmission = z.infer<typeof insertJotformSubmissionSchema>;
export type JotformSubmission = typeof jotformSubmissions.$inferSelect;
export type InsertChatbotConversation = z.infer<typeof insertChatbotConversationSchema>;
export type ChatbotConversation = typeof chatbotConversations.$inferSelect;
