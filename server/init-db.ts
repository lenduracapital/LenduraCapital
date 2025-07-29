import { db } from "./db";
import { users, loanApplications, contactSubmissions, jotformSubmissions, chatbotConversations, auditLogs, chatMessages } from "./schema";

async function initializeDatabase() {
  console.log('🔧 Initializing database tables...');
  
  try {
    // Create sample admin user
    try {
      await db.insert(users).values({
        username: 'admin',
        password: 'fundtek2025'
      }).onConflictDoNothing();
      console.log('✅ Admin user created/verified');
    } catch (error) {
      console.log('ℹ️ Admin user already exists');
    }

    // Create sample loan applications
    try {
      await db.insert(loanApplications).values([
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          businessName: 'Doe Enterprises',
          loanAmount: 50000,
          status: 'pending'
        },
        {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          businessName: 'Smith LLC',
          loanAmount: 75000,
          status: 'approved'
        }
      ]).onConflictDoNothing();
      console.log('✅ Sample loan applications created');
    } catch (error) {
      console.log('ℹ️ Sample loan applications already exist');
    }

    // Create sample contact submissions
    try {
      await db.insert(contactSubmissions).values([
        {
          firstName: 'Alice',
          lastName: 'Johnson',
          email: 'alice@example.com',
          message: 'Interested in business loan options'
        },
        {
          firstName: 'Bob',
          lastName: 'Wilson',
          email: 'bob@example.com',
          message: 'Need information about SBA loans'
        }
      ]).onConflictDoNothing();
      console.log('✅ Sample contact submissions created');
    } catch (error) {
      console.log('ℹ️ Sample contact submissions already exist');
    }

    console.log('🎉 Database initialization complete!');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  }
}

// Run initialization if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeDatabase().then(() => process.exit(0));
}

export { initializeDatabase };