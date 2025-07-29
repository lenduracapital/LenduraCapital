import { z } from 'zod';

// =============================================================================
// ENVIRONMENT CONFIGURATION WITH VALIDATION
// =============================================================================

const envSchema = z.object({
  // Database (Required)
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid PostgreSQL connection string'),
  
  // Server Configuration
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(val => parseInt(val, 10)).pipe(z.number().min(1).max(65535)).default('5000'),
  HOST: z.string().default('0.0.0.0'),
  
  // Security (Optional with defaults)
  SESSION_SECRET: z.string().min(32, 'SESSION_SECRET must be at least 32 characters').optional(),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters').optional(),
  CORS_ORIGINS: z.string().optional(),
  
  // External Services (Optional)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().transform(val => val ? parseInt(val, 10) : undefined).optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  
  GOOGLE_ANALYTICS_ID: z.string().optional(),
  SENTRY_DSN: z.string().url().optional(),
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.string().transform(val => val ? parseInt(val, 10) : 900000).default('900000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(val => val ? parseInt(val, 10) : 100).default('100'),
  
  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  DEBUG_REQUESTS: z.string().transform(val => val === 'true').default('false'),
  
  // Deployment Platform (Auto-detected)
  REPL_ID: z.string().optional(),
  REPL_SLUG: z.string().optional(),
  RAILWAY_PROJECT_ID: z.string().optional(),
  VERCEL_URL: z.string().optional(),
  HEROKU_APP_NAME: z.string().optional(),
});

// =============================================================================
// ENVIRONMENT VALIDATION AND CONFIGURATION
// =============================================================================

function validateEnvironment() {
  try {
    // Auto-detect production mode
    const isProduction = process.env.NODE_ENV === 'production' || process.cwd().endsWith('/dist');
    
    // Override NODE_ENV if we detect production
    if (isProduction && !process.env.NODE_ENV) {
      process.env.NODE_ENV = 'production';
    }
    
    // Use port from environment or default based on mode
    if (!process.env.PORT) {
      // Replit deployment expects the app to bind to PORT environment variable
      // If not set, use 80 for production (deployment) or 5000 for development
      process.env.PORT = isProduction ? '80' : '5000';
    }
    
    // Generate secure session secret if missing
    if (!process.env.SESSION_SECRET) {
      process.env.SESSION_SECRET = generateSecureSecret();
      console.log('⚠️  Generated temporary session secret. Set SESSION_SECRET environment variable for production.');
    }
    
    const config = envSchema.parse(process.env);
    
    console.log('✅ Environment configuration validated successfully');
    console.log(`📍 Environment: ${config.NODE_ENV}`);
    console.log(`🌐 Port: ${config.PORT}`);
    console.log(`🗄️  Database: ${config.DATABASE_URL ? 'Connected' : 'Missing'}`);
    
    return config;
  } catch (error) {
    console.error('❌ Environment configuration error:');
    
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
      
      console.error('\n💡 Fix suggestions:');
      console.error('  1. Check your .env file or deployment environment variables');
      console.error('  2. Ensure DATABASE_URL is set with a valid PostgreSQL connection string');
      console.error('  3. Review the .env.example file for required variables');
    } else {
      console.error(error);
    }
    
    process.exit(1);
  }
}

// Generate secure random secret for development
function generateSecureSecret(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let result = '';
  for (let i = 0; i < 64; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// =============================================================================
// DEPLOYMENT PLATFORM DETECTION
// =============================================================================

export function getDeploymentInfo() {
  const platform = {
    name: 'unknown',
    url: process.env.VERCEL_URL || process.env.RAILWAY_STATIC_URL || 'localhost',
    isReplit: !!process.env.REPL_ID,
    isRailway: !!process.env.RAILWAY_PROJECT_ID,
    isVercel: !!process.env.VERCEL_URL,
    isHeroku: !!process.env.HEROKU_APP_NAME,
  };
  
  if (platform.isReplit) platform.name = 'Replit';
  else if (platform.isRailway) platform.name = 'Railway';
  else if (platform.isVercel) platform.name = 'Vercel';
  else if (platform.isHeroku) platform.name = 'Heroku';
  
  return platform;
}

// =============================================================================
// CORS CONFIGURATION
// =============================================================================

export function getCorsOrigins(): string[] {
  const config = getConfig();
  
  if (config.CORS_ORIGINS) {
    return config.CORS_ORIGINS.split(',').map(origin => origin.trim());
  }
  
  // Auto-detect based on deployment platform
  const deployment = getDeploymentInfo();
  
  const origins = ['http://localhost:3000', 'http://localhost:5000'];
  
  if (deployment.url && deployment.url !== 'localhost') {
    origins.push(`https://${deployment.url}`);
    origins.push(`http://${deployment.url}`);
  }
  
  return origins;
}

// =============================================================================
// CONFIGURATION SINGLETON
// =============================================================================

let configCache: z.infer<typeof envSchema> | null = null;

export function getConfig(): z.infer<typeof envSchema> {
  if (!configCache) {
    configCache = validateEnvironment();
  }
  return configCache;
}

// Initialize configuration on import
export const config = getConfig();

// Export types for TypeScript support
export type Config = z.infer<typeof envSchema>;
export type DeploymentPlatform = ReturnType<typeof getDeploymentInfo>;