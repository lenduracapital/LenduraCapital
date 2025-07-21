-- Initialize FundTek Capital Group Database Schema
-- This script creates the required tables for the admin dashboard

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

-- Loan applications table
CREATE TABLE IF NOT EXISTS loan_applications (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    business_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(100),
    years_in_business INTEGER,
    monthly_revenue INTEGER,
    loan_amount INTEGER NOT NULL,
    loan_purpose TEXT,
    credit_score INTEGER,
    status VARCHAR(50) DEFAULT 'pending' NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    funding_amount VARCHAR(50),
    message TEXT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Jotform submissions table
CREATE TABLE IF NOT EXISTS jotform_submissions (
    id SERIAL PRIMARY KEY,
    submission_id VARCHAR(100) UNIQUE NOT NULL,
    form_id VARCHAR(100) NOT NULL,
    form_title VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(20),
    business_name VARCHAR(255),
    funding_amount VARCHAR(100),
    business_type VARCHAR(100),
    raw_data TEXT,
    status VARCHAR(50) DEFAULT 'new' NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Chatbot conversations table
CREATE TABLE IF NOT EXISTS chatbot_conversations (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    phone_number VARCHAR(20),
    email VARCHAR(255),
    user_type VARCHAR(100),
    timeline VARCHAR(100),
    product VARCHAR(100),
    revenue VARCHAR(100),
    business_type VARCHAR(100),
    debt_q1 VARCHAR(100),
    debt_q2 VARCHAR(100),
    conversation_data TEXT,
    status VARCHAR(50) DEFAULT 'active' NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
    id SERIAL PRIMARY KEY,
    conversation_id VARCHAR(100) NOT NULL,
    message_id VARCHAR(100) NOT NULL,
    text TEXT NOT NULL,
    sender VARCHAR(10) NOT NULL CHECK (sender IN ('bot', 'user')),
    timestamp TIMESTAMP NOT NULL
);

-- Audit logs table
CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    action VARCHAR(50) NOT NULL,
    resource VARCHAR(100) NOT NULL,
    resource_id VARCHAR(100),
    old_values TEXT,
    new_values TEXT,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT,
    session_id VARCHAR(100),
    success BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Insert sample admin user
INSERT INTO users (username, password) VALUES ('admin', 'fundtek2025') ON CONFLICT (username) DO NOTHING;

-- Insert sample data for testing the admin dashboard
INSERT INTO loan_applications (first_name, last_name, email, business_name, loan_amount) VALUES 
    ('John', 'Doe', 'john.doe@example.com', 'Doe Enterprises', 50000),
    ('Jane', 'Smith', 'jane.smith@example.com', 'Smith LLC', 75000)
ON CONFLICT DO NOTHING;

INSERT INTO contact_submissions (first_name, last_name, email, message) VALUES 
    ('Alice', 'Johnson', 'alice@example.com', 'Interested in business loan options'),
    ('Bob', 'Wilson', 'bob@example.com', 'Need information about SBA loans')
ON CONFLICT DO NOTHING;