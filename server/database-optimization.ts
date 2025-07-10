import pkg from 'pg';
const { Pool } = pkg;
import { drizzle } from 'drizzle-orm/node-postgres';

// Enhanced database connection pooling for better performance
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Maximum connections in pool
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 2000, // Timeout after 2 seconds
  maxUses: 7500, // Reuse connections up to 7500 times
});

// Optimized database instance with connection pooling
export const optimizedDb = drizzle(pool);

// Database health monitoring
export async function checkDatabaseHealth() {
  try {
    const start = Date.now();
    await pool.query('SELECT 1');
    const latency = Date.now() - start;
    
    return {
      status: 'healthy',
      latency,
      totalConnections: pool.totalCount,
      idleConnections: pool.idleCount,
      waitingConnections: pool.waitingCount
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Query performance optimization
export function withQueryOptimization<T>(queryFn: () => Promise<T>): Promise<T> {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('Query timeout')), 5000);
  });
  
  return Promise.race([queryFn(), timeout]);
}

// Connection monitoring for Google PageSpeed insights
export function monitorDatabasePerformance() {
  setInterval(async () => {
    const health = await checkDatabaseHealth();
    if (health.status === 'healthy' && health.latency && health.latency > 1000) {
      // Log slow database performance for optimization
    }
  }, 60000); // Check every minute
}