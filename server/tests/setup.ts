import { beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { db } from '../db';
import { users, loanApplications, contactSubmissions, auditLogs } from '@shared/schema';
import { testEncryption } from '../middleware/encryption';

// Test database cleanup
export const cleanupDatabase = async () => {
  try {
    // Clean up test data in reverse dependency order
    await db.delete(auditLogs);
    await db.delete(contactSubmissions);
    await db.delete(loanApplications);
    await db.delete(users);
  } catch (error) {
    console.warn('Database cleanup warning:', error);
  }
};

// Setup test environment
beforeAll(async () => {
  // Verify encryption is working
  const encryptionWorks = testEncryption();
  if (!encryptionWorks) {
    throw new Error('Encryption system not working properly');
  }

  // Ensure test database is clean
  await cleanupDatabase();
});

// Cleanup after all tests
afterAll(async () => {
  await cleanupDatabase();
});

// Reset between individual tests
beforeEach(async () => {
  // Could add per-test setup here if needed
});

afterEach(async () => {
  // Cleanup any test-specific data
});

// Test data factories
export const createTestUser = () => ({
  username: `testuser_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  password: 'TestPassword123!'
});

export const createTestLoanApplication = () => ({
  firstName: 'John',
  lastName: 'Doe',
  email: `test_${Date.now()}@example.com`,
  phone: '555-0123',
  businessName: 'Test Business LLC',
  businessType: 'Retail',
  yearsInBusiness: 3,
  monthlyRevenue: 50000,
  loanAmount: 100000,
  loanPurpose: 'Equipment purchase',
  creditScore: 720,
  status: 'pending'
});

export const createTestContactSubmission = () => ({
  firstName: 'Jane',
  lastName: 'Smith',
  email: `contact_${Date.now()}@example.com`,
  phone: '555-0456',
  fundingAmount: '$50,000',
  message: 'Interested in business funding options'
});

// API test helpers
export const createAuthHeaders = (token?: string) => ({
  'Content-Type': 'application/json',
  ...(token && { 'Authorization': `Bearer ${token}` })
});

// Performance test helpers
export const measureExecutionTime = async <T>(fn: () => Promise<T>): Promise<{ result: T; duration: number }> => {
  const start = performance.now();
  const result = await fn();
  const duration = performance.now() - start;
  return { result, duration };
};

// Security test helpers
export const generateMaliciousPayloads = () => [
  // XSS payloads
  '<script>alert("xss")</script>',
  'javascript:alert("xss")',
  
  // SQL injection payloads
  "'; DROP TABLE users; --",
  "1' OR '1'='1",
  
  // Path traversal
  '../../../etc/passwd',
  '..\\..\\..\\windows\\system32\\config\\sam',
  
  // NoSQL injection
  '{"$ne": null}',
  '{"$where": "return true"}',
  
  // Command injection
  '; cat /etc/passwd',
  '`cat /etc/passwd`',
  
  // LDAP injection
  '*)(uid=*',
  '*()|%26'
];

// Load testing helpers
export const simulateLoad = async (
  requestFn: () => Promise<any>,
  concurrent: number = 10,
  duration: number = 1000
): Promise<{
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  errors: string[];
}> => {
  const results: { success: boolean; duration: number; error?: string }[] = [];
  const startTime = Date.now();
  
  while (Date.now() - startTime < duration) {
    const promises = Array(concurrent).fill(null).map(async () => {
      const start = performance.now();
      try {
        await requestFn();
        return { success: true, duration: performance.now() - start };
      } catch (error) {
        return { 
          success: false, 
          duration: performance.now() - start,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    });
    
    const batchResults = await Promise.all(promises);
    results.push(...batchResults);
    
    // Small delay between batches
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  const successfulRequests = results.filter(r => r.success).length;
  const failedRequests = results.length - successfulRequests;
  const averageResponseTime = results.reduce((sum, r) => sum + r.duration, 0) / results.length;
  const errors = results.filter(r => !r.success).map(r => r.error || 'Unknown').slice(0, 10); // Limit errors
  
  return {
    totalRequests: results.length,
    successfulRequests,
    failedRequests,
    averageResponseTime,
    errors
  };
};