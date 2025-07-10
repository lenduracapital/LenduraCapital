import { describe, it, expect, beforeEach } from 'vitest';
import { encryptField, decryptField, maskSensitiveField, hashField, validateEncryptedField, testEncryption, createEncryptionMiddleware } from '../../middleware/encryption';

describe('Encryption Middleware', () => {
  beforeEach(() => {
    // Set test environment
    process.env.NODE_ENV = 'test';
  });

  describe('encryptField and decryptField', () => {
    it('should encrypt and decrypt data correctly', () => {
      const testData = '123-45-6789';
      const encrypted = encryptField(testData);
      const decrypted = decryptField(encrypted!);
      
      expect(encrypted).toBeDefined();
      expect(encrypted).not.toBe(testData);
      expect(decrypted).toBe(testData);
    });

    it('should handle null and undefined values', () => {
      expect(encryptField('')).toBeNull();
      expect(encryptField(null as any)).toBeNull();
      expect(decryptField('')).toBeNull();
      expect(decryptField(null as any)).toBeNull();
    });

    it('should produce different encrypted values for same input', () => {
      const testData = '123-45-6789';
      const encrypted1 = encryptField(testData);
      const encrypted2 = encryptField(testData);
      
      expect(encrypted1).not.toBe(encrypted2);
      expect(decryptField(encrypted1!)).toBe(testData);
      expect(decryptField(encrypted2!)).toBe(testData);
    });
  });

  describe('maskSensitiveField', () => {
    it('should mask SSN correctly', () => {
      expect(maskSensitiveField('123456789', 'ssn')).toBe('***-**-6789');
      expect(maskSensitiveField('123-45-6789', 'ssn')).toBe('***-**-6789');
    });

    it('should mask account numbers correctly', () => {
      expect(maskSensitiveField('1234567890', 'account')).toBe('****7890');
      expect(maskSensitiveField('123456', 'account')).toBe('****3456');
    });

    it('should mask routing numbers correctly', () => {
      expect(maskSensitiveField('123456789', 'routing')).toBe('****6789');
    });

    it('should mask phone numbers correctly', () => {
      expect(maskSensitiveField('1234567890', 'phone')).toBe('***-***-7890');
      expect(maskSensitiveField('555-123-4567', 'phone')).toBe('***-***-4567');
    });

    it('should handle empty values', () => {
      expect(maskSensitiveField('', 'ssn')).toBe('***-**-****');
      expect(maskSensitiveField('', 'account')).toBe('****');
    });
  });

  describe('hashField', () => {
    it('should produce consistent hashes for same input', () => {
      const testData = '123-45-6789';
      const hash1 = hashField(testData);
      const hash2 = hashField(testData);
      
      expect(hash1).toBe(hash2);
      expect(hash1).toHaveLength(64); // SHA-256 hex
    });

    it('should produce different hashes for different inputs', () => {
      const hash1 = hashField('123-45-6789');
      const hash2 = hashField('987-65-4321');
      
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('validateEncryptedField', () => {
    it('should validate correct encrypted data', () => {
      const testData = '123-45-6789';
      const encrypted = encryptField(testData);
      
      expect(validateEncryptedField(encrypted!)).toBe(true);
    });

    it('should reject invalid encrypted data', () => {
      expect(validateEncryptedField('invalid-data')).toBe(false);
      expect(validateEncryptedField('')).toBe(false);
    });
  });

  describe('createEncryptionMiddleware', () => {
    const middleware = createEncryptionMiddleware(['ssn', 'bankAccount']);

    it('should encrypt specified fields', () => {
      const data = {
        ssn: '123-45-6789',
        bankAccount: '1234567890',
        email: 'test@example.com'
      };

      const encrypted = middleware.encryptFields(data);
      
      expect(encrypted.ssn).not.toBe(data.ssn);
      expect(encrypted.bankAccount).not.toBe(data.bankAccount);
      expect(encrypted.email).toBe(data.email); // Not encrypted
    });

    it('should decrypt specified fields', () => {
      const data = {
        ssn: '123-45-6789',
        bankAccount: '1234567890',
        email: 'test@example.com'
      };

      const encrypted = middleware.encryptFields(data);
      const decrypted = middleware.decryptFields(encrypted);
      
      expect(decrypted.ssn).toBe(data.ssn);
      expect(decrypted.bankAccount).toBe(data.bankAccount);
      expect(decrypted.email).toBe(data.email);
    });

    it('should mask specified fields', () => {
      const data = {
        ssn: '123-45-6789',
        bankAccount: '1234567890',
        routingNumber: '123456789'
      };

      const masked = middleware.maskFields(data, {
        ssn: 'ssn',
        bankAccount: 'account',
        routingNumber: 'routing'
      });
      
      expect(masked.ssn).toBe('***-**-6789');
      expect(masked.bankAccount).toBe('****7890');
      expect(masked.routingNumber).toBe('****6789');
    });
  });

  describe('testEncryption', () => {
    it('should return true for working encryption system', () => {
      expect(testEncryption()).toBe(true);
    });
  });
});