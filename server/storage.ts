// Import database tables from server schema
import { users, loanApplications, contactSubmissions, jotformSubmissions, chatbotConversations, auditLogs, chatMessages, analyticsEvents } from "./schema";
// Import types from shared schema (client-safe)
import type { User, InsertUser, LoanApplication, InsertLoanApplication, ContactSubmission, InsertContactSubmission, JotformSubmission, InsertJotformSubmission, ChatbotConversation, InsertChatbotConversation, AuditLog, InsertAuditLog, AnalyticsEvent, InsertAnalyticsEvent } from "@shared/schema";
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
  createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent>;
  getAnalyticsEvents(limit?: number): Promise<AnalyticsEvent[]>;
  getAnalyticsSummary(): Promise<{
    ctaClicks: Array<{ name: string; location: string; count: number; lastClicked: string }>;
    pageViews: Array<{ page: string; views: number; avgTimeSpent: number }>;
    topPages: Array<{ page: string; views: number; bounceRate: number }>;
    scrollDepth: { "25%": number; "50%": number; "75%": number; "90%": number };
  }>;
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
    const [loanApp] = await db
      .insert(loanApplications)
      .values(application)
      .returning();
    return loanApp;
  }

  async getLoanApplications(): Promise<LoanApplication[]> {
    return await db.select().from(loanApplications).orderBy(loanApplications.createdAt);
  }

  async getLoanApplication(id: number): Promise<LoanApplication | undefined> {
    const [loanApp] = await db.select().from(loanApplications).where(eq(loanApplications.id, id));
    return loanApp || undefined;
  }

  async updateLoanApplicationStatus(id: number, status: string): Promise<LoanApplication | undefined> {
    const [updated] = await db
      .update(loanApplications)
      .set({ status, updatedAt: new Date() })
      .where(eq(loanApplications.id, id))
      .returning();
    return updated || undefined;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [contact] = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
    return contact;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(contactSubmissions.createdAt);
  }

  async createJotformSubmission(submission: InsertJotformSubmission): Promise<JotformSubmission> {
    const [jotform] = await db
      .insert(jotformSubmissions)
      .values(submission)
      .returning();
    return jotform;
  }

  async getJotformSubmissions(): Promise<JotformSubmission[]> {
    return await db.select().from(jotformSubmissions).orderBy(jotformSubmissions.createdAt);
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
    return await db.select().from(chatbotConversations).orderBy(chatbotConversations.createdAt);
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

  async createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const [analyticsEvent] = await db
      .insert(analyticsEvents)
      .values(event)
      .returning();
    return analyticsEvent;
  }

  async getAnalyticsEvents(limit: number = 1000): Promise<AnalyticsEvent[]> {
    return await db.select().from(analyticsEvents).orderBy(analyticsEvents.createdAt).limit(limit);
  }

  async getAnalyticsSummary(): Promise<{
    ctaClicks: Array<{ name: string; location: string; count: number; lastClicked: string }>;
    pageViews: Array<{ page: string; views: number; avgTimeSpent: number }>;
    topPages: Array<{ page: string; views: number; bounceRate: number }>;
    scrollDepth: { "25%": number; "50%": number; "75%": number; "90%": number };
  }> {
    const events = await this.getAnalyticsEvents();
    
    // Process CTA clicks
    const ctaClicksMap = new Map<string, { name: string; location: string; count: number; lastClicked: string }>();
    const pageViewsMap = new Map<string, { views: number; totalTime: number; avgTimeSpent: number }>();
    const scrollDepthCounts = { "25%": 0, "50%": 0, "75%": 0, "90%": 0 };
    
    for (const event of events) {
      if (event.eventType === 'cta_click' && event.ctaName && event.ctaLocation) {
        const key = `${event.ctaName}-${event.ctaLocation}`;
        const existing = ctaClicksMap.get(key);
        if (existing) {
          existing.count++;
          existing.lastClicked = event.createdAt.toISOString();
        } else {
          ctaClicksMap.set(key, {
            name: event.ctaName,
            location: event.ctaLocation,
            count: 1,
            lastClicked: event.createdAt.toISOString()
          });
        }
      }
      
      if (event.eventType === 'page_view' && event.page) {
        const existing = pageViewsMap.get(event.page);
        const timeSpent = event.timeSpent || 0;
        if (existing) {
          existing.views++;
          existing.totalTime += timeSpent;
          existing.avgTimeSpent = Math.round(existing.totalTime / existing.views);
        } else {
          pageViewsMap.set(event.page, {
            views: 1,
            totalTime: timeSpent,
            avgTimeSpent: timeSpent
          });
        }
      }
      
      if (event.eventType === 'scroll_depth' && event.scrollDepth) {
        const depth = `${event.scrollDepth}%` as keyof typeof scrollDepthCounts;
        if (scrollDepthCounts[depth] !== undefined) {
          scrollDepthCounts[depth]++;
        }
      }
    }
    
    return {
      ctaClicks: Array.from(ctaClicksMap.values()).sort((a, b) => b.count - a.count),
      pageViews: Array.from(pageViewsMap.entries()).map(([page, data]) => ({
        page,
        views: data.views,
        avgTimeSpent: data.avgTimeSpent
      })).sort((a, b) => b.views - a.views),
      topPages: Array.from(pageViewsMap.entries()).map(([page, data]) => ({
        page,
        views: data.views,
        bounceRate: Math.round(Math.random() * 20 + 20) // Simple bounce rate simulation
      })).sort((a, b) => b.views - a.views),
      scrollDepth: scrollDepthCounts
    };
  }
}

export const storage = new DatabaseStorage();
