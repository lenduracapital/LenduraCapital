// Import database tables from shared schema
import { users, loanApplications, contactSubmissions, jotformSubmissions, chatbotConversations, auditLogs, chatMessages } from "@shared/schema";
// Import types from shared schema (client-safe)
import type { User, InsertUser, LoanApplication, InsertLoanApplication, ContactSubmission, InsertContactSubmission, JotformSubmission, InsertJotformSubmission, ChatbotConversation, InsertChatbotConversation, AuditLog, InsertAuditLog } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createLoanApplication(application: InsertLoanApplication): Promise<LoanApplication>;
  getLoanApplications(): Promise<LoanApplication[]>;
  getLoanApplication(id: number): Promise<LoanApplication | undefined>;
  updateLoanApplicationStatus(id: number, status: string): Promise<LoanApplication | undefined>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  createJotformSubmission(submission: InsertJotformSubmission): Promise<JotformSubmission>;
  getJotformSubmissions(): Promise<JotformSubmission[]>;
  getJotformSubmission(id: number): Promise<JotformSubmission | undefined>;
  updateJotformSubmissionStatus(id: number, status: string): Promise<JotformSubmission | undefined>;
  createChatbotConversation(conversation: InsertChatbotConversation): Promise<ChatbotConversation>;
  getChatbotConversations(): Promise<ChatbotConversation[]>;
  getChatbotConversation(id: number): Promise<ChatbotConversation | undefined>;
  getChatbotConversationBySessionId(sessionId: string): Promise<ChatbotConversation | undefined>;
  updateChatbotConversation(sessionId: string, updates: Partial<InsertChatbotConversation>): Promise<ChatbotConversation | undefined>;
  saveChatMessage(conversationId: string, messageId: string, text: string, sender: 'bot' | 'user', timestamp: Date): Promise<void>;
  getChatMessages(conversationId: string): Promise<any[]>;
  createAuditLog(auditLog: InsertAuditLog): Promise<AuditLog>;
  getAuditLogs(limit?: number): Promise<AuditLog[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createLoanApplication(application: InsertLoanApplication): Promise<LoanApplication> {
    try {
      // Use transaction to ensure data integrity
      const result = await db.transaction(async (tx) => {
        const [loanApp] = await tx
          .insert(loanApplications)
          .values(application)
          .returning();
        return loanApp;
      });
      return result;
    } catch (error) {
      // Transaction automatically rolls back on error
      throw error;
    }
  }

  async getLoanApplications(): Promise<LoanApplication[]> {
    try {
      return await db.select().from(loanApplications).orderBy(loanApplications.createdAt);
    } catch (error) {
      console.error('Error in getLoanApplications:', error);
      return [];
    }
  }

  async getLoanApplication(id: number): Promise<LoanApplication | undefined> {
    const [loanApp] = await db.select().from(loanApplications).where(eq(loanApplications.id, id));
    return loanApp || undefined;
  }

  async updateLoanApplicationStatus(id: number, status: string): Promise<LoanApplication | undefined> {
    try {
      const result = await db.transaction(async (tx) => {
        const [updated] = await tx
          .update(loanApplications)
          .set({ status, updatedAt: new Date() })
          .where(eq(loanApplications.id, id))
          .returning();
        return updated;
      });
      return result || undefined;
    } catch (error) {
      // Transaction automatically rolls back on error
      throw error;
    }
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    try {
      const result = await db.transaction(async (tx) => {
        const [contact] = await tx
          .insert(contactSubmissions)
          .values(submission)
          .returning();
        return contact;
      });
      return result;
    } catch (error) {
      // Transaction automatically rolls back on error
      throw error;
    }
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    try {
      return await db.select().from(contactSubmissions).orderBy(contactSubmissions.createdAt);
    } catch (error) {
      console.error('Error in getContactSubmissions:', error);
      return [];
    }
  }

  async createJotformSubmission(submission: InsertJotformSubmission): Promise<JotformSubmission> {
    const [jotform] = await db
      .insert(jotformSubmissions)
      .values(submission)
      .returning();
    return jotform;
  }

  async getJotformSubmissions(): Promise<JotformSubmission[]> {
    try {
      return await db.select().from(jotformSubmissions).orderBy(jotformSubmissions.createdAt);
    } catch (error) {
      console.error('Error in getJotformSubmissions:', error);
      return [];
    }
  }

  async getJotformSubmission(id: number): Promise<JotformSubmission | undefined> {
    const [jotform] = await db.select().from(jotformSubmissions).where(eq(jotformSubmissions.id, id));
    return jotform || undefined;
  }

  async updateJotformSubmissionStatus(id: number, status: string): Promise<JotformSubmission | undefined> {
    const [updated] = await db
      .update(jotformSubmissions)
      .set({ status, updatedAt: new Date() })
      .where(eq(jotformSubmissions.id, id))
      .returning();
    return updated || undefined;
  }

  async createChatbotConversation(conversation: InsertChatbotConversation): Promise<ChatbotConversation> {
    const [chatbot] = await db
      .insert(chatbotConversations)
      .values(conversation)
      .returning();
    return chatbot;
  }

  async getChatbotConversations(): Promise<ChatbotConversation[]> {
    try {
      return await db.select().from(chatbotConversations).orderBy(chatbotConversations.createdAt);
    } catch (error) {
      console.error('Error in getChatbotConversations:', error);
      return [];
    }
  }

  async getChatbotConversation(id: number): Promise<ChatbotConversation | undefined> {
    const [chatbot] = await db.select().from(chatbotConversations).where(eq(chatbotConversations.id, id));
    return chatbot || undefined;
  }

  async getChatbotConversationBySessionId(sessionId: string): Promise<ChatbotConversation | undefined> {
    const [chatbot] = await db.select().from(chatbotConversations).where(eq(chatbotConversations.sessionId, sessionId));
    return chatbot || undefined;
  }

  async updateChatbotConversation(sessionId: string, updates: Partial<InsertChatbotConversation>): Promise<ChatbotConversation | undefined> {
    const [updated] = await db
      .update(chatbotConversations)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(chatbotConversations.sessionId, sessionId))
      .returning();
    return updated || undefined;
  }

  async saveChatMessage(conversationId: string, messageId: string, text: string, sender: 'bot' | 'user', timestamp: Date): Promise<void> {
    await db.insert(chatMessages).values({
      conversationId,
      messageId,
      text,
      sender,
      timestamp
    });
  }

  async getChatMessages(conversationId: string): Promise<any[]> {
    return await db.select().from(chatMessages)
      .where(eq(chatMessages.conversationId, conversationId))
      .orderBy(chatMessages.timestamp);
  }

  async createAuditLog(auditLog: InsertAuditLog): Promise<AuditLog> {
    const auditData = {
      ...auditLog,
      oldValues: auditLog.oldValues ? JSON.stringify(auditLog.oldValues) : null,
      newValues: auditLog.newValues ? JSON.stringify(auditLog.newValues) : null,
    };

    const [audit] = await db
      .insert(auditLogs)
      .values(auditData)
      .returning();
    return audit;
  }

  async getAuditLogs(limit: number = 100): Promise<AuditLog[]> {
    return await db.select().from(auditLogs)
      .orderBy(auditLogs.createdAt)
      .limit(limit);
  }


}

export const storage = new DatabaseStorage();
