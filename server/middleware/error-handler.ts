import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { auditLogger } from '../audit-logger';

// Custom error class for application errors
export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  code?: string;

  constructor(message: string, statusCode: number, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Structured error response interface
interface ErrorResponse {
  status: string;
  message: string;
  code?: string;
  errors?: Array<{
    field: string;
    message: string;
    code: string;
  }>;
  timestamp: string;
  path: string;
  requestId?: string;
}

// Handle Zod validation errors
const handleZodError = (error: ZodError): AppError => {
  const errors = error.errors.map(err => ({
    field: err.path.join('.'),
    message: err.message,
    code: err.code
  }));

  const message = `Validation failed: ${errors.map(e => `${e.field} ${e.message}`).join(', ')}`;
  const appError = new AppError(message, 422, 'VALIDATION_ERROR');
  (appError as any).validationErrors = errors;
  return appError;
};

// Handle database constraint errors
const handleDatabaseError = (error: any): AppError => {
  if (error.code === '23505') {
    return new AppError('Resource already exists', 409, 'DUPLICATE_RESOURCE');
  }
  if (error.code === '23503') {
    return new AppError('Referenced resource not found', 404, 'FOREIGN_KEY_VIOLATION');
  }
  if (error.code === '23502') {
    return new AppError('Required field missing', 400, 'NOT_NULL_VIOLATION');
  }
  return new AppError('Database operation failed', 500, 'DATABASE_ERROR');
};

// Send error response in development
const sendErrorDev = (err: AppError, req: Request, res: Response) => {
  const errorResponse: ErrorResponse = {
    status: err.status,
    message: err.message,
    code: err.code,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    requestId: req.headers['x-request-id'] as string,
  };

  // Add validation errors if present
  if ((err as any).validationErrors) {
    errorResponse.errors = (err as any).validationErrors;
  }

  // Include stack trace in development
  (errorResponse as any).stack = err.stack;

  res.status(err.statusCode).json(errorResponse);
};

// Send error response in production
const sendErrorProd = (err: AppError, req: Request, res: Response) => {
  const errorResponse: ErrorResponse = {
    status: err.status,
    message: err.isOperational ? err.message : 'Something went wrong',
    code: err.isOperational ? err.code : 'INTERNAL_ERROR',
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    requestId: req.headers['x-request-id'] as string,
  };

  // Add validation errors if present and operational
  if (err.isOperational && (err as any).validationErrors) {
    errorResponse.errors = (err as any).validationErrors;
  }

  res.status(err.statusCode).json(errorResponse);
};

// Main error handling middleware
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for audit trail
  auditLogger.logError(
    req,
    'ERROR_HANDLER',
    'global',
    `${error.message} - Stack: ${error.stack?.slice(0, 500)}`
  );

  // Handle specific error types
  if (err instanceof ZodError) {
    error = handleZodError(err);
  } else if (err.code && err.code.startsWith('23')) {
    error = handleDatabaseError(err);
  } else if (!err.statusCode) {
    error = new AppError('Internal server error', 500, 'INTERNAL_ERROR');
  }

  // Send appropriate response based on environment
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, req, res);
  } else {
    sendErrorProd(error, req, res);
  }
};

// Catch unhandled async errors
export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

// 404 handler for unknown routes
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const err = new AppError(`Can't find ${req.originalUrl} on this server`, 404, 'ROUTE_NOT_FOUND');
  next(err);
};

// Request ID middleware
export const requestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.headers['x-request-id'] = req.headers['x-request-id'] || 
    `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  res.setHeader('X-Request-ID', req.headers['x-request-id'] as string);
  next();
};

// Common HTTP status codes and their meanings
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503
} as const;