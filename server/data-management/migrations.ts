import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
const { Pool } = pkg;
import { sql } from 'drizzle-orm';
import crypto from 'crypto';

// Migration interface
interface Migration {
  id: string;
  name: string;
  description: string;
  up: (db: any) => Promise<void>;
  down: (db: any) => Promise<void>;
  createdAt: Date;
}

// Migration status
interface MigrationRecord {
  id: string;
  name: string;
  executedAt: Date;
  checksum: string;
}

// Migration Manager
export class MigrationManager {
  private db: any;
  private pool: Pool;
  private migrations: Migration[] = [];

  constructor(connectionString: string) {
    this.pool = new Pool({ connectionString });
    this.db = drizzle(this.pool);
  }

  // Initialize migration tracking table
  async initialize() {
    await this.db.execute(sql`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        executed_at TIMESTAMP NOT NULL DEFAULT NOW(),
        checksum VARCHAR(64) NOT NULL
      )
    `);
  }

  // Register a migration
  registerMigration(migration: Migration) {
    // Calculate checksum for migration integrity
    const migrationContent = `${migration.up.toString()}${migration.down.toString()}`;
    const checksum = crypto.createHash('sha256').update(migrationContent).digest('hex');
    
    this.migrations.push({
      ...migration,
      id: `${migration.id}_${checksum.substring(0, 8)}`
    });
  }

  // Get executed migrations
  async getExecutedMigrations(): Promise<MigrationRecord[]> {
    const result = await this.db.execute(sql`
      SELECT id, name, executed_at, checksum 
      FROM schema_migrations 
      ORDER BY executed_at ASC
    `);
    return result.rows;
  }

  // Get pending migrations
  async getPendingMigrations(): Promise<Migration[]> {
    const executed = await this.getExecutedMigrations();
    const executedIds = new Set(executed.map(m => m.id));
    
    return this.migrations.filter(m => !executedIds.has(m.id));
  }

  // Run pending migrations
  async runPendingMigrations(): Promise<{ success: boolean; migrationsRun: string[]; errors: string[] }> {
    const pending = await this.getPendingMigrations();
    const migrationsRun: string[] = [];
    const errors: string[] = [];

    for (const migration of pending) {
      try {
        console.log(`Running migration: ${migration.name}`);
        
        // Start transaction
        await this.db.execute(sql`BEGIN`);
        
        try {
          // Execute migration
          await migration.up(this.db);
          
          // Record migration
          const checksum = crypto.createHash('sha256')
            .update(`${migration.up.toString()}${migration.down.toString()}`)
            .digest('hex');
          
          await this.db.execute(sql`
            INSERT INTO schema_migrations (id, name, executed_at, checksum)
            VALUES (${migration.id}, ${migration.name}, NOW(), ${checksum})
          `);
          
          await this.db.execute(sql`COMMIT`);
          migrationsRun.push(migration.name);
          
          console.log(`✅ Migration completed: ${migration.name}`);
        } catch (error) {
          await this.db.execute(sql`ROLLBACK`);
          throw error;
        }
      } catch (error) {
        const errorMsg = `Migration failed: ${migration.name} - ${error}`;
        console.error(`❌ ${errorMsg}`);
        errors.push(errorMsg);
        break; // Stop on first error
      }
    }

    return {
      success: errors.length === 0,
      migrationsRun,
      errors
    };
  }

  // Rollback last migration
  async rollbackLastMigration(): Promise<{ success: boolean; rolledBack?: string; error?: string }> {
    const executed = await this.getExecutedMigrations();
    if (executed.length === 0) {
      return { success: false, error: 'No migrations to rollback' };
    }

    const lastMigration = executed[executed.length - 1];
    const migration = this.migrations.find(m => m.id === lastMigration.id);
    
    if (!migration) {
      return { success: false, error: `Migration definition not found: ${lastMigration.name}` };
    }

    try {
      console.log(`Rolling back migration: ${migration.name}`);
      
      await this.db.execute(sql`BEGIN`);
      
      try {
        // Execute rollback
        await migration.down(this.db);
        
        // Remove migration record
        await this.db.execute(sql`
          DELETE FROM schema_migrations WHERE id = ${migration.id}
        `);
        
        await this.db.execute(sql`COMMIT`);
        
        console.log(`✅ Rollback completed: ${migration.name}`);
        return { success: true, rolledBack: migration.name };
      } catch (error) {
        await this.db.execute(sql`ROLLBACK`);
        throw error;
      }
    } catch (error) {
      const errorMsg = `Rollback failed: ${migration.name} - ${error}`;
      console.error(`❌ ${errorMsg}`);
      return { success: false, error: errorMsg };
    }
  }

  // Get migration status
  async getStatus(): Promise<{
    total: number;
    executed: number;
    pending: number;
    lastMigration?: string;
    lastExecuted?: Date;
  }> {
    const executed = await this.getExecutedMigrations();
    const pending = await this.getPendingMigrations();
    
    return {
      total: this.migrations.length,
      executed: executed.length,
      pending: pending.length,
      lastMigration: executed.length > 0 ? executed[executed.length - 1].name : undefined,
      lastExecuted: executed.length > 0 ? executed[executed.length - 1].executedAt : undefined
    };
  }

  async close() {
    await this.pool.end();
  }
}

// Define migrations
export const migrations: Migration[] = [
  {
    id: '001',
    name: 'add_encryption_fields',
    description: 'Add encryption support for sensitive fields',
    createdAt: new Date('2025-01-08'),
    up: async (db) => {
      await db.execute(sql`
        ALTER TABLE loan_applications 
        ADD COLUMN IF NOT EXISTS ssn_encrypted TEXT,
        ADD COLUMN IF NOT EXISTS bank_account_encrypted TEXT,
        ADD COLUMN IF NOT EXISTS routing_number_encrypted TEXT,
        ADD COLUMN IF NOT EXISTS date_of_birth_encrypted TEXT
      `);
    },
    down: async (db) => {
      await db.execute(sql`
        ALTER TABLE loan_applications 
        DROP COLUMN IF EXISTS ssn_encrypted,
        DROP COLUMN IF EXISTS bank_account_encrypted,
        DROP COLUMN IF EXISTS routing_number_encrypted,
        DROP COLUMN IF EXISTS date_of_birth_encrypted
      `);
    }
  },
  
  {
    id: '002',
    name: 'add_compliance_tables',
    description: 'Add tables for compliance tracking',
    createdAt: new Date('2025-01-08'),
    up: async (db) => {
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS compliance_events (
          id SERIAL PRIMARY KEY,
          event_type VARCHAR(100) NOT NULL,
          description TEXT,
          control_id VARCHAR(50),
          severity VARCHAR(20) DEFAULT 'medium',
          resolved BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT NOW(),
          resolved_at TIMESTAMP,
          metadata JSONB
        )
      `);
      
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS data_retention_policies (
          id SERIAL PRIMARY KEY,
          table_name VARCHAR(100) NOT NULL,
          retention_days INTEGER NOT NULL,
          policy_description TEXT,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        )
      `);
    },
    down: async (db) => {
      await db.execute(sql`DROP TABLE IF EXISTS compliance_events`);
      await db.execute(sql`DROP TABLE IF EXISTS data_retention_policies`);
    }
  },
  
  {
    id: '003',
    name: 'add_performance_indexes',
    description: 'Add database indexes for performance optimization',
    createdAt: new Date('2025-01-08'),
    up: async (db) => {
      await db.execute(sql`
        CREATE INDEX IF NOT EXISTS idx_loan_applications_status ON loan_applications(status);
        CREATE INDEX IF NOT EXISTS idx_loan_applications_created_at ON loan_applications(created_at);
        CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
        CREATE INDEX IF NOT EXISTS idx_audit_logs_resource ON audit_logs(resource);
        CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);
      `);
    },
    down: async (db) => {
      await db.execute(sql`
        DROP INDEX IF EXISTS idx_loan_applications_status;
        DROP INDEX IF EXISTS idx_loan_applications_created_at;
        DROP INDEX IF EXISTS idx_audit_logs_created_at;
        DROP INDEX IF EXISTS idx_audit_logs_resource;
        DROP INDEX IF EXISTS idx_contact_submissions_created_at;
      `);
    }
  },

  {
    id: '004',
    name: 'add_gdpr_compliance',
    description: 'Add GDPR compliance fields and procedures',
    createdAt: new Date('2025-01-08'),
    up: async (db) => {
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS data_subject_requests (
          id SERIAL PRIMARY KEY,
          request_type VARCHAR(50) NOT NULL, -- 'access', 'rectification', 'erasure', 'portability'
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(20),
          request_details TEXT,
          status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'rejected'
          submitted_at TIMESTAMP DEFAULT NOW(),
          completed_at TIMESTAMP,
          processed_by INTEGER,
          notes TEXT
        );
      `);
      
      await db.execute(sql`
        ALTER TABLE loan_applications 
        ADD COLUMN IF NOT EXISTS consent_marketing BOOLEAN DEFAULT FALSE,
        ADD COLUMN IF NOT EXISTS consent_processing BOOLEAN DEFAULT TRUE,
        ADD COLUMN IF NOT EXISTS consent_date TIMESTAMP,
        ADD COLUMN IF NOT EXISTS data_retention_date TIMESTAMP
      `);
      
      await db.execute(sql`
        ALTER TABLE contact_submissions 
        ADD COLUMN IF NOT EXISTS consent_marketing BOOLEAN DEFAULT FALSE,
        ADD COLUMN IF NOT EXISTS consent_processing BOOLEAN DEFAULT TRUE,
        ADD COLUMN IF NOT EXISTS consent_date TIMESTAMP
      `);
    },
    down: async (db) => {
      await db.execute(sql`DROP TABLE IF EXISTS data_subject_requests`);
      await db.execute(sql`
        ALTER TABLE loan_applications 
        DROP COLUMN IF EXISTS consent_marketing,
        DROP COLUMN IF EXISTS consent_processing,
        DROP COLUMN IF EXISTS consent_date,
        DROP COLUMN IF EXISTS data_retention_date
      `);
      await db.execute(sql`
        ALTER TABLE contact_submissions 
        DROP COLUMN IF EXISTS consent_marketing,
        DROP COLUMN IF EXISTS consent_processing,
        DROP COLUMN IF EXISTS consent_date
      `);
    }
  }
];

// Initialize migration manager
export function createMigrationManager(connectionString?: string): MigrationManager {
  const manager = new MigrationManager(connectionString || process.env.DATABASE_URL!);
  
  // Register all migrations
  migrations.forEach(migration => {
    manager.registerMigration(migration);
  });
  
  return manager;
}

// CLI helper for running migrations
export async function runMigrations(connectionString?: string) {
  const manager = createMigrationManager(connectionString);
  
  try {
    await manager.initialize();
    console.log('📊 Migration system initialized');
    
    const status = await manager.getStatus();
    console.log(`📈 Migration status: ${status.executed}/${status.total} executed, ${status.pending} pending`);
    
    if (status.pending > 0) {
      console.log('🚀 Running pending migrations...');
      const result = await manager.runPendingMigrations();
      
      if (result.success) {
        console.log(`✅ Successfully ran ${result.migrationsRun.length} migrations`);
        result.migrationsRun.forEach(name => console.log(`  ✓ ${name}`));
      } else {
        console.error('❌ Migration errors:');
        result.errors.forEach(error => console.error(`  ✗ ${error}`));
      }
    } else {
      console.log('✅ All migrations up to date');
    }
  } catch (error) {
    console.error('❌ Migration system error:', error);
  } finally {
    await manager.close();
  }
}