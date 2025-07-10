import { Request } from "express";
import { storage } from "./storage";
import { type InsertAuditLog } from "@shared/schema";

export class AuditLogger {
  private static instance: AuditLogger;
  
  static getInstance(): AuditLogger {
    if (!AuditLogger.instance) {
      AuditLogger.instance = new AuditLogger();
    }
    return AuditLogger.instance;
  }

  private getClientInfo(req: Request) {
    return {
      ipAddress: req.ip || req.connection.remoteAddress || 'unknown',
      userAgent: req.get('User-Agent') || 'unknown',
      sessionId: req.sessionID
    };
  }

  async logAction(
    req: Request,
    action: string,
    resource: string,
    options: {
      resourceId?: string;
      userId?: number;
      oldValues?: Record<string, any>;
      newValues?: Record<string, any>;
      success?: boolean;
      errorMessage?: string;
    } = {}
  ) {
    try {
      const clientInfo = this.getClientInfo(req);
      
      const auditEntry: InsertAuditLog = {
        userId: options.userId,
        action,
        resource,
        resourceId: options.resourceId,
        oldValues: options.oldValues,
        newValues: options.newValues,
        ipAddress: clientInfo.ipAddress,
        userAgent: clientInfo.userAgent,
        sessionId: clientInfo.sessionId,
        success: options.success !== false,
        errorMessage: options.errorMessage
      };

      // Store audit log in database
      await storage.createAuditLog(auditEntry);

      // Log to console for immediate visibility
      console.log(`[AUDIT] ${action} on ${resource} by ${clientInfo.ipAddress} at ${new Date().toISOString()}`);
      
    } catch (error) {
      console.error('Failed to create audit log:', error);
      // Don't throw - audit logging should not break application flow
    }
  }

  // Convenience methods for common actions
  async logCreate(req: Request, resource: string, resourceId: string, data: Record<string, any>, userId?: number) {
    await this.logAction(req, 'CREATE', resource, {
      resourceId,
      userId,
      newValues: data,
      success: true
    });
  }

  async logUpdate(req: Request, resource: string, resourceId: string, oldValues: Record<string, any>, newValues: Record<string, any>, userId?: number) {
    await this.logAction(req, 'UPDATE', resource, {
      resourceId,
      userId,
      oldValues,
      newValues,
      success: true
    });
  }

  async logDelete(req: Request, resource: string, resourceId: string, userId?: number) {
    await this.logAction(req, 'DELETE', resource, {
      resourceId,
      userId,
      success: true
    });
  }

  async logRead(req: Request, resource: string, resourceId?: string, userId?: number) {
    await this.logAction(req, 'READ', resource, {
      resourceId,
      userId,
      success: true
    });
  }

  async logError(req: Request, action: string, resource: string, error: string, userId?: number) {
    await this.logAction(req, action, resource, {
      userId,
      success: false,
      errorMessage: error
    });
  }

  async logLogin(req: Request, userId: number, success: boolean, errorMessage?: string) {
    await this.logAction(req, 'LOGIN', 'user', {
      userId,
      success,
      errorMessage
    });
  }

  async logLogout(req: Request, userId: number) {
    await this.logAction(req, 'LOGOUT', 'user', {
      userId,
      success: true
    });
  }
}

export const auditLogger = AuditLogger.getInstance();