import sgMail from '@sendgrid/mail';
import type { InsertLoanApplication, InsertContactSubmission } from "@shared/schema";

// Initialize SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn('⚠️  SENDGRID_API_KEY not configured - email notifications will be skipped');
}

// Email configuration
const EMAIL_CONFIG = {
  from: 'sam@lenduracapital.com',
  to: 'subs@lenduracapital.com',
  replyTo: 'sam@lenduracapital.com'
};

// Enhanced email header template with improved Lendura Capital branding
const getEmailHeader = (title: string, subtitle: string, icon: string, accentColor: string = '#10b981') => `
  <div style="background: linear-gradient(135deg, #193a59 0%, #1e40af 50%, #285d8a 100%); padding: 50px 30px; text-align: center; position: relative; overflow: hidden; border-bottom: 4px solid ${accentColor};">
    <!-- Animated background elements -->
    <div style="position: absolute; top: -60px; right: -60px; width: 120px; height: 120px; background: rgba(255,255,255,0.08); border-radius: 50%; pointer-events: none;"></div>
    <div style="position: absolute; bottom: -40px; left: -40px; width: 80px; height: 80px; background: rgba(255,255,255,0.06); border-radius: 50%; pointer-events: none;"></div>
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 200px; height: 200px; background: rgba(255,255,255,0.02); border-radius: 50%; pointer-events: none;"></div>
    
    <div style="position: relative; z-index: 10;">
      <!-- Company Logo Area -->
      <div style="margin-bottom: 25px;">
        <div style="display: inline-block; background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border-radius: 20px; padding: 20px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.2);">
          <div style="font-size: 56px; margin-bottom: 8px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">${icon}</div>
        </div>
      </div>
      
      <!-- Company Name -->
      <div style="margin-bottom: 15px;">
        <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.8px; text-shadow: 0 3px 6px rgba(0,0,0,0.2); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          LENDURA CAPITAL
        </h1>
      </div>
      
      <!-- Title and Subtitle -->
      <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 15px; padding: 25px; margin: 0 auto; max-width: 500px; border: 1px solid rgba(255,255,255,0.15);">
        <h2 style="color: white; margin: 0 0 12px 0; font-size: 24px; font-weight: 700; letter-spacing: -0.3px;">
          ${title}
        </h2>
        <p style="color: rgba(255,255,255,0.95); margin: 0; font-size: 16px; font-weight: 400; line-height: 1.4;">
          ${subtitle}
        </p>
      </div>
    </div>
  </div>
`;

// Enhanced email footer with better branding
const getEmailFooter = () => `
  <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 40px 30px; text-align: center; border-top: 4px solid #10b981;">
    <!-- Company Info Section -->
    <div style="margin-bottom: 30px;">
      <div style="display: inline-block; background: white; border-radius: 15px; padding: 25px; box-shadow: 0 4px 20px rgba(25, 58, 89, 0.1); border: 2px solid #193a59;">
        <h3 style="color: #193a59; margin: 0 0 8px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">
          LENDURA CAPITAL
        </h3>
        <p style="color: #64748b; margin: 0; font-size: 16px; font-weight: 500;">
          💼 Business Funding Solutions
        </p>
      </div>
    </div>
    
    <!-- Contact Information -->
    <div style="margin-bottom: 25px;">
      <div style="display: inline-flex; gap: 25px; margin-bottom: 15px; flex-wrap: wrap; justify-content: center;">
        <div style="display: flex; align-items: center; gap: 10px; background: white; padding: 12px 20px; border-radius: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border: 1px solid #e2e8f0;">
          <span style="background: linear-gradient(135deg, #193a59, #285d8a); color: white; padding: 8px; border-radius: 50%; font-size: 14px; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px;">📞</span>
          <a href="tel:+13058347168" style="color: #193a59; text-decoration: none; font-weight: 600; font-size: 15px;">(305) 834-7168</a>
        </div>
        <div style="display: flex; align-items: center; gap: 10px; background: white; padding: 12px 20px; border-radius: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border: 1px solid #e2e8f0;">
          <span style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 8px; border-radius: 50%; font-size: 14px; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px;">✉️</span>
          <a href="mailto:sam@lenduracapital.com" style="color: #193a59; text-decoration: none; font-weight: 600; font-size: 15px;">sam@lenduracapital.com</a>
        </div>
      </div>
    </div>
    
    <!-- Tagline -->
    <div style="background: rgba(25, 58, 89, 0.05); border-radius: 10px; padding: 20px; margin: 0 auto; max-width: 500px; border-left: 4px solid #193a59;">
      <p style="color: #475569; font-size: 14px; margin: 0; line-height: 1.6; font-weight: 500;">
        🚀 <strong>Fast Business Funding</strong><br>
        This email was automatically generated from our secure platform.<br>
        <em>We respond within 24 hours to ensure excellent service.</em>
      </p>
    </div>
  </div>
`;

// Enhanced info row component with premium styling
const createInfoRow = (label: string, value: string | number | undefined | null, highlight: boolean = false, icon: string = '') => {
  if (!value && value !== 0) return '';
  
  const bgColor = highlight ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)';
  const textColor = highlight ? '#b45309' : '#0f172a';
  const borderColor = highlight ? '#f59e0b' : '#e2e8f0';
  
  return `
    <div style="padding: 20px 25px; border-bottom: 2px solid ${borderColor}; display: flex; justify-content: space-between; align-items: center; min-height: 70px; transition: background 0.3s ease;">
      <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
        ${icon ? `<span style="font-size: 18px; opacity: 0.8;">${icon}</span>` : ''}
        <span style="color: #475569; font-weight: 600; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px; ${icon ? '' : 'padding-left: 10px;'}">${label}</span>
      </div>
      <div style="background: ${bgColor}; color: ${textColor}; font-weight: 700; padding: 12px 18px; border-radius: 12px; font-size: 15px; max-width: 350px; text-align: right; word-wrap: break-word; border: 2px solid ${highlight ? '#f59e0b' : 'transparent'}; box-shadow: 0 2px 8px rgba(0,0,0,0.08); ${highlight ? 'transform: scale(1.02);' : ''}">
        ${value}
      </div>
    </div>
  `;
};

// Enhanced section component with premium design
const createSection = (title: string, content: string, icon: string = '📊', accentColor: string = '#10b981') => `
  <div style="margin-bottom: 35px;">
    <!-- Section Header -->
    <div style="background: linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%); border-radius: 15px 15px 0 0; padding: 20px 25px; margin-bottom: 0;">
      <h2 style="color: white; margin: 0; font-size: 22px; font-weight: 700; display: flex; align-items: center; gap: 15px; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">
        <span style="background: rgba(255,255,255,0.2); padding: 8px; border-radius: 50%; font-size: 20px; backdrop-filter: blur(10px);">${icon}</span>
        ${title}
      </h2>
    </div>
    <!-- Section Content -->
    <div style="background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%); border: 2px solid ${accentColor}; border-top: none; border-radius: 0 0 15px 15px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.08); position: relative;">
      <div style="position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, ${accentColor} 0%, ${accentColor}aa 50%, ${accentColor} 100%); opacity: 0.7;"></div>
      ${content}
      <div style="height: 8px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);"></div>
    </div>
  </div>
`;

// Loan Application Email Template
export const createLoanApplicationEmail = (data: InsertLoanApplication, timestamp: string) => {
  const leadId = `LA-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  
  const personalInfo = [
    createInfoRow('Full Name', `${data.firstName} ${data.lastName}`, true, '👤'),
    createInfoRow('Email Address', data.email, false, '📧'),
    createInfoRow('Phone Number', data.phone || 'Not provided', false, '📞'),
  ].join('');

  const businessInfo = [
    createInfoRow('Business Name', data.businessName, true, '🏢'),
    createInfoRow('Business Type', data.businessType || 'Not specified', false, '🏭'),
    createInfoRow('Years in Business', data.yearsInBusiness ? `${data.yearsInBusiness} years` : 'Not provided', false, '📅'),
    createInfoRow('Monthly Revenue', data.monthlyRevenue ? `$${data.monthlyRevenue.toLocaleString()}` : 'Not provided', true, '💰'),
  ].join('');

  const loanInfo = [
    createInfoRow('Requested Amount', `$${data.loanAmount.toLocaleString()}`, true, '🎯'),
    createInfoRow('Loan Purpose', data.loanPurpose || 'Not specified', false, '📋'),
    createInfoRow('Credit Score', data.creditScore ? data.creditScore.toString() : 'Not provided', false, '📊'),
    createInfoRow('Application Status', data.status?.toUpperCase() || 'PENDING', true, '🔄'),
  ].join('');

  return {
    to: EMAIL_CONFIG.to,
    from: EMAIL_CONFIG.from,
    replyTo: EMAIL_CONFIG.replyTo,
    subject: `💼 PRIORITY: New Loan Application #${leadId} - ${data.firstName} ${data.lastName} ($${data.loanAmount.toLocaleString()}) - URGENT REVIEW`,
    text: `New Loan Application Received

Lead ID: ${leadId}
Timestamp: ${timestamp}

Applicant: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Business: ${data.businessName}
Loan Amount: $${data.loanAmount.toLocaleString()}

Please review and contact the applicant promptly.`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Loan Application - Lendura Capital</title>
      </head>
      <body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #334155;">
        <div style="max-width: 700px; margin: 0 auto; background: white; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); overflow: hidden;">
          
          ${getEmailHeader('New Loan Application', 'Lendura Capital', '📋')}

          <div style="padding: 40px;">
            <!-- Alert Banner -->
            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; margin-bottom: 30px; text-align: center;">
              <div style="display: flex; align-items: center; justify-content: center; gap: 15px; flex-wrap: wrap;">
                <div>
                  <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Application Received</p>
                  <p style="margin: 5px 0 0 0; color: #78350f; font-size: 16px; font-weight: 700;">${timestamp}</p>
                </div>
                <div style="background: #193a59; color: white; padding: 8px 16px; border-radius: 25px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                  LOAN APPLICATION
                </div>
              </div>
            </div>

            ${createSection('Personal Information', personalInfo, '👤', '#2563eb')}
            ${createSection('Business Information', businessInfo, '🏢', '#059669')}
            ${createSection('Loan Details', loanInfo, '💰', '#dc2626')}

            <!-- Action Required -->
            <div style="background: linear-gradient(135deg, #193a59 0%, #285d8a 100%); border-radius: 12px; padding: 25px; text-align: center; margin-top: 30px;">
              <h3 style="color: white; margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">⚡ Action Required</h3>
              <p style="color: rgba(255,255,255,0.9); margin: 0 0 20px 0; font-size: 14px; line-height: 1.5;">
                This loan application requires immediate attention. Contact the applicant within 2 hours for optimal conversion.
              </p>
              <div style="display: inline-flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
                <a href="tel:${data.phone || ''}" style="background: white; color: #193a59; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-flex; align-items: center; gap: 8px;">
                  📞 Call Now
                </a>
                <a href="mailto:${data.email}" style="background: rgba(255,255,255,0.2); color: white; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgba(255,255,255,0.3);">
                  ✉️ Send Email
                </a>
              </div>
            </div>
          </div>

          ${getEmailFooter()}
        </div>
      </body>
      </html>
    `
  };
};

// Lead Capture Email Template
export const createLeadCaptureEmail = (data: any, timestamp: string) => {
  const leadId = `LC-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  
  const contactInfo = [
    createInfoRow('Full Name', data.firstName || data.name || 'Not provided', true, '👤'),
    createInfoRow('Email Address', data.email, false, '📧'),
    createInfoRow('Phone Number', data.phone || data.phoneNumber || 'Not provided', false, '📞'),
  ].join('');

  const qualificationInfo = [
    createInfoRow('Funding Amount', data.fundingAmount, true, '🎯'),
    createInfoRow('Monthly Revenue', data.monthlyRevenue || 'Not provided', false, '💰'),
    createInfoRow('Time in Business', data.timeInBusiness || 'Not provided', false, '📅'),
    createInfoRow('Credit Score Range', data.creditScore || 'Not provided', false, '📊'),
  ].join('');

  // Determine qualification status
  const isQualified = data.message?.includes('QUALIFIED');
  const qualificationBadge = isQualified 
    ? `<span style="background: #dcfce7; color: #16a34a; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase;">✅ Qualified</span>`
    : `<span style="background: #fef3c7; color: #d97706; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase;">⚠️ Needs Review</span>`;

  return {
    to: EMAIL_CONFIG.to,
    from: EMAIL_CONFIG.from,
    replyTo: EMAIL_CONFIG.replyTo,
    subject: `🔥 HOT LEAD: Lead Capture #${leadId} - ${data.firstName || 'Lead'} (${data.fundingAmount}) - CALL NOW!`,
    text: `New Lead Capture Received

Lead ID: ${leadId}
Timestamp: ${timestamp}

Contact: ${data.firstName || data.name || 'Not provided'}
Email: ${data.email}
Phone: ${data.phone || data.phoneNumber || 'Not provided'}
Funding Amount: ${data.fundingAmount}
Status: ${isQualified ? 'QUALIFIED' : 'NEEDS REVIEW'}

Please contact this lead immediately for best conversion rates.`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Lead Capture - Lendura Capital</title>
      </head>
      <body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #334155;">
        <div style="max-width: 700px; margin: 0 auto; background: white; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); overflow: hidden;">
          
          ${getEmailHeader('New Lead Capture', 'Lendura Capital', '🎯')}

          <div style="padding: 40px;">
            <!-- Alert Banner -->
            <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border: 2px solid #16a34a; border-radius: 12px; padding: 20px; margin-bottom: 30px; text-align: center;">
              <div style="display: flex; align-items: center; justify-content: center; gap: 15px; flex-wrap: wrap;">
                <div>
                  <p style="margin: 0; color: #15803d; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Lead Captured</p>
                  <p style="margin: 5px 0 0 0; color: #14532d; font-size: 16px; font-weight: 700;">${timestamp}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <div style="background: #193a59; color: white; padding: 8px 16px; border-radius: 25px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                    LEAD CAPTURE
                  </div>
                  ${qualificationBadge}
                </div>
              </div>
            </div>

            ${createSection('Contact Information', contactInfo, '👤', '#10b981')}
            ${createSection('Qualification Details', qualificationInfo, '📊', '#f59e0b')}

            ${data.message ? `
            <div style="margin-bottom: 30px;">
              <h2 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 16px;">💬</span>
                Additional Notes
              </h2>
              <div style="background: #f1f5f9; border-left: 4px solid #10b981; border-radius: 8px; padding: 20px;">
                <p style="margin: 0; color: #374151; line-height: 1.6; font-size: 14px;">
                  ${data.message}
                </p>
              </div>
            </div>
            ` : ''}

            <!-- Urgent Action -->
            <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); border-radius: 12px; padding: 25px; text-align: center; margin-top: 30px;">
              <h3 style="color: white; margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">🚨 Time-Sensitive Lead</h3>
              <p style="color: rgba(255,255,255,0.9); margin: 0 0 20px 0; font-size: 14px; line-height: 1.5;">
                Lead capture forms have the highest conversion when contacted within 5 minutes. Call immediately!
              </p>
              <div style="display: inline-flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
                <a href="tel:${data.phone || data.phoneNumber || ''}" style="background: white; color: #ef4444; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px; display: inline-flex; align-items: center; gap: 8px;">
                  📞 Call NOW
                </a>
                <a href="mailto:${data.email}" style="background: rgba(255,255,255,0.2); color: white; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgba(255,255,255,0.3);">
                  ✉️ Email Backup
                </a>
              </div>
            </div>
          </div>

          ${getEmailFooter()}
        </div>
      </body>
      </html>
    `
  };
};

// Contact Form Email Template
export const createContactFormEmail = (data: any, timestamp: string) => {
  const leadId = `CF-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  
  const contactInfo = [
    createInfoRow('Full Name', `${data.firstName || ''} ${data.lastName || ''}`.trim() || data.name || 'Not provided', true, '👤'),
    createInfoRow('Email Address', data.email, false, '📧'),
    createInfoRow('Phone Number', data.phone || data.phoneNumber || 'Not provided', false, '📞'),
  ].join('');

  const businessInfo = [
    data.company ? createInfoRow('Company', data.company, false, '🏢') : '',
    data.businessType ? createInfoRow('Business Type', data.businessType, false, '🏭') : '',
    data.timeInBusiness ? createInfoRow('Time in Business', data.timeInBusiness, false, '📅') : '',
    data.monthlyRevenue ? createInfoRow('Monthly Revenue', data.monthlyRevenue, true, '💰') : '',
    data.creditScore ? createInfoRow('Credit Score', data.creditScore, false, '📊') : '',
    data.fundingAmount ? createInfoRow('Funding Amount', data.fundingAmount, true, '🎯') : '',
    data.fundingPurpose ? createInfoRow('Funding Purpose', data.fundingPurpose, false, '📋') : '',
    data.timeline ? createInfoRow('Timeline', data.timeline, false, '⏰') : '',
  ].filter(Boolean).join('');

  return {
    to: EMAIL_CONFIG.to,
    from: EMAIL_CONFIG.from,
    replyTo: EMAIL_CONFIG.replyTo,
    subject: `💬 URGENT: Contact Inquiry #${leadId} - ${data.firstName || data.name || 'Contact'} ${data.lastName || ''} - RESPONSE NEEDED`.trim(),
    text: `New Contact Form Submission

Lead ID: ${leadId}
Timestamp: ${timestamp}

Contact: ${data.firstName || data.name || ''} ${data.lastName || ''}
Email: ${data.email}
Phone: ${data.phone || data.phoneNumber || 'Not provided'}
${data.company ? `Company: ${data.company}` : ''}
${data.fundingAmount ? `Funding Amount: ${data.fundingAmount}` : ''}
${data.message ? `Message: ${data.message}` : ''}

Please follow up with this contact promptly.`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Inquiry - Lendura Capital</title>
      </head>
      <body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #334155;">
        <div style="max-width: 700px; margin: 0 auto; background: white; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); overflow: hidden;">
          
          ${getEmailHeader('New Contact Inquiry', 'Lendura Capital', '💬')}

          <div style="padding: 40px;">
            <!-- Alert Banner -->
            <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border: 2px solid #3b82f6; border-radius: 12px; padding: 20px; margin-bottom: 30px; text-align: center;">
              <div style="display: flex; align-items: center; justify-content: center; gap: 15px; flex-wrap: wrap;">
                <div>
                  <p style="margin: 0; color: #1d4ed8; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Contact Received</p>
                  <p style="margin: 5px 0 0 0; color: #1e40af; font-size: 16px; font-weight: 700;">${timestamp}</p>
                </div>
                <div style="background: #193a59; color: white; padding: 8px 16px; border-radius: 25px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                  CONTACT FORM
                </div>
              </div>
            </div>

            ${createSection('Contact Information', contactInfo, '👤', '#6366f1')}
            
            ${businessInfo ? createSection('Business Information', businessInfo, '🏢', '#059669') : ''}

            ${data.message ? `
            <div style="margin-bottom: 30px;">
              <h2 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 16px;">💬</span>
                Message
              </h2>
              <div style="background: #f8fafc; border-left: 4px solid #6366f1; border-radius: 8px; padding: 20px;">
                <p style="margin: 0; color: #374151; line-height: 1.6; font-size: 14px; white-space: pre-wrap;">
                  ${data.message}
                </p>
              </div>
            </div>
            ` : ''}

            <!-- Follow-up Action -->
            <div style="background: linear-gradient(135deg, #193a59 0%, #285d8a 100%); border-radius: 12px; padding: 25px; text-align: center; margin-top: 30px;">
              <h3 style="color: white; margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">📞 Follow-up Required</h3>
              <p style="color: rgba(255,255,255,0.9); margin: 0 0 20px 0; font-size: 14px; line-height: 1.5;">
                Contact this inquiry promptly to provide excellent customer service and convert the lead.
              </p>
              <div style="display: inline-flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
                <a href="tel:${data.phone || data.phoneNumber || ''}" style="background: white; color: #193a59; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-flex; align-items: center; gap: 8px;">
                  📞 Call Back
                </a>
                <a href="mailto:${data.email}" style="background: rgba(255,255,255,0.2); color: white; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgba(255,255,255,0.3);">
                  ✉️ Reply via Email
                </a>
              </div>
            </div>
          </div>

          ${getEmailFooter()}
        </div>
      </body>
      </html>
    `
  };
};

// Main email sending functions
export const sendLoanApplicationEmail = async (data: InsertLoanApplication): Promise<boolean> => {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('⚠️  SendGrid API key not configured - skipping loan application email');
    return false;
  }

  try {
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    const emailData = createLoanApplicationEmail(data, timestamp);
    await sgMail.send(emailData);
    
    console.log('✅ Loan application email sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to send loan application email:', error);
    return false;
  }
};

export const sendLeadCaptureEmail = async (data: any): Promise<boolean> => {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('⚠️  SendGrid API key not configured - skipping lead capture email');
    return false;
  }

  try {
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    const emailData = createLeadCaptureEmail(data, timestamp);
    await sgMail.send(emailData);
    
    console.log('✅ Lead capture email sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to send lead capture email:', error);
    return false;
  }
};

export const sendContactFormEmail = async (data: any): Promise<boolean> => {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('⚠️  SendGrid API key not configured - skipping contact form email');
    return false;
  }

  try {
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    const emailData = createContactFormEmail(data, timestamp);
    await sgMail.send(emailData);
    
    console.log('✅ Contact form email sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to send contact form email:', error);
    return false;
  }
};

// Health check function
export const testSendGridConnection = async (): Promise<boolean> => {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('⚠️  SendGrid API key not configured');
    return false;
  }

  try {
    // This will throw if API key is invalid
    const testData = createContactFormEmail({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '555-0123',
      message: 'This is a test email to verify SendGrid configuration.'
    }, new Date().toLocaleString());

    console.log('✅ SendGrid configuration is valid');
    return true;
  } catch (error) {
    console.error('❌ SendGrid configuration error:', error);
    return false;
  }
};