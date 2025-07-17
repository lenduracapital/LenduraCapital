import crypto from 'crypto';

// Encryption configuration
const ALGORITHM = 'aes-256-gcm';
const KEY_LENGTH = 32; // 256 bits
const IV_LENGTH = 16; // 128 bits
const TAG_LENGTH = 16; // 128 bits

// Get encryption key from environment or generate one
const getEncryptionKey = (): Buffer => {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    console.warn('⚠️  ENCRYPTION_KEY not set. Using default key for development only!');
    // In production, this should throw an error
    return crypto.scryptSync('default-dev-key-change-in-production', 'salt', KEY_LENGTH);
  }
  
  // If key is hex string, convert to buffer
  if (key.length === KEY_LENGTH * 2) {
    return Buffer.from(key, 'hex');
  }
  
  // Derive key from string using scrypt
  return crypto.scryptSync(key, 'fundtek-salt', KEY_LENGTH);
};

const encryptionKey = getEncryptionKey();

// Encrypt sensitive data
export function encryptField(plaintext: string): string | null {
  if (!plaintext || typeof plaintext !== 'string') {
    return null;
  }

  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, encryptionKey, iv);
    cipher.setAAD(Buffer.from('fundtek-aad')); // Additional authenticated data
    
    let encrypted = cipher.update(plaintext, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    
    const tag = cipher.getAuthTag();
    
    // Combine IV + tag + encrypted data
    const combined = Buffer.concat([iv, tag, Buffer.from(encrypted, 'base64')]);
    return combined.toString('base64');
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt sensitive data');
  }
}

// Decrypt sensitive data
export function decryptField(encryptedData: string): string | null {
  if (!encryptedData || typeof encryptedData !== 'string') {
    return null;
  }

  try {
    const combined = Buffer.from(encryptedData, 'base64');
    
    // Validate minimum data length
    if (combined.length < IV_LENGTH + TAG_LENGTH) {
      throw new Error('Invalid encrypted data: insufficient length');
    }
    
    // Extract components
    const iv = combined.subarray(0, IV_LENGTH);
    const tag = combined.subarray(IV_LENGTH, IV_LENGTH + TAG_LENGTH);
    const encrypted = combined.subarray(IV_LENGTH + TAG_LENGTH);
    
    // Validate authentication tag length (security fix)
    if (tag.length !== TAG_LENGTH) {
      throw new Error(`Invalid authentication tag length: expected ${TAG_LENGTH} bytes, got ${tag.length} bytes`);
    }
    
    const decipher = crypto.createDecipheriv(ALGORITHM, encryptionKey, iv, { authTagLength: TAG_LENGTH });
    decipher.setAuthTag(tag);
    decipher.setAAD(Buffer.from('fundtek-aad'));
    
    let decrypted = decipher.update(encrypted, null, 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    return null; // Return null instead of throwing to handle corrupted data gracefully
  }
}

// Mask sensitive data for display (show only last 4 digits)
export function maskSensitiveField(value: string, type: 'ssn' | 'account' | 'routing' | 'phone' = 'account'): string {
  if (!value || typeof value !== 'string') {
    return '****';
  }

  const cleanValue = value.replace(/\D/g, ''); // Remove non-digits
  
  switch (type) {
    case 'ssn':
      if (cleanValue.length >= 4) {
        return `***-**-${cleanValue.slice(-4)}`;
      }
      return '***-**-****';
    
    case 'account':
      if (cleanValue.length >= 4) {
        return `****${cleanValue.slice(-4)}`;
      }
      return '****';
    
    case 'routing':
      if (cleanValue.length === 9) {
        return `****${cleanValue.slice(-4)}`;
      }
      return '****';
    
    case 'phone':
      if (cleanValue.length >= 4) {
        return `***-***-${cleanValue.slice(-4)}`;
      }
      return '***-***-****';
    
    default:
      return '****';
  }
}

// Hash sensitive data for search/comparison (one-way)
export function hashField(plaintext: string): string {
  if (!plaintext || typeof plaintext !== 'string') {
    return '';
  }
  
  return crypto
    .createHmac('sha256', encryptionKey)
    .update(plaintext)
    .digest('hex');
}

// Validate that field can be decrypted (data integrity check)
export function validateEncryptedField(encryptedData: string): boolean {
  try {
    const decrypted = decryptField(encryptedData);
    return decrypted !== null;
  } catch {
    return false;
  }
}

// Define which fields should be encrypted
export const ENCRYPTED_FIELDS = {
  // Personal Identifiable Information
  SSN: 'ssn',
  DATE_OF_BIRTH: 'dateOfBirth',
  DRIVERS_LICENSE: 'driversLicense',
  
  // Financial Information
  BANK_ACCOUNT: 'bankAccount',
  ROUTING_NUMBER: 'routingNumber',
  CREDIT_CARD: 'creditCard',
  TAX_ID: 'taxId',
  
  // Contact Information (optional encryption)
  EMAIL: 'email',
  PHONE: 'phone',
  ADDRESS: 'address'
} as const;

// Middleware to automatically encrypt/decrypt fields
export function createEncryptionMiddleware(fieldsToEncrypt: string[]) {
  return {
    // Encrypt fields before saving to database
    encryptFields: (data: Record<string, any>): Record<string, any> => {
      const encrypted = { ...data };
      
      fieldsToEncrypt.forEach(field => {
        if (encrypted[field] && typeof encrypted[field] === 'string') {
          encrypted[field] = encryptField(encrypted[field]);
        }
      });
      
      return encrypted;
    },
    
    // Decrypt fields after retrieving from database
    decryptFields: (data: Record<string, any>): Record<string, any> => {
      const decrypted = { ...data };
      
      fieldsToEncrypt.forEach(field => {
        if (decrypted[field] && typeof decrypted[field] === 'string') {
          decrypted[field] = decryptField(decrypted[field]);
        }
      });
      
      return decrypted;
    },
    
    // Mask fields for API responses
    maskFields: (data: Record<string, any>, fieldsToMask: Record<string, 'ssn' | 'account' | 'routing' | 'phone'> = {}): Record<string, any> => {
      const masked = { ...data };
      
      Object.entries(fieldsToMask).forEach(([field, type]) => {
        if (masked[field] && typeof masked[field] === 'string') {
          masked[field] = maskSensitiveField(masked[field], type);
        }
      });
      
      return masked;
    }
  };
}

// Generate a new encryption key (for setup)
export function generateEncryptionKey(): string {
  return crypto.randomBytes(KEY_LENGTH).toString('hex');
}

// Test encryption/decryption functionality
export function testEncryption(): boolean {
  try {
    const testData = 'test-sensitive-data-123';
    const encrypted = encryptField(testData);
    const decrypted = decryptField(encrypted!);
    
    return decrypted === testData;
  } catch {
    return false;
  }
}