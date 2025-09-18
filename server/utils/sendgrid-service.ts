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

// Simplified email header with minimal branding
const getEmailHeader = (title: string, subtitle: string, icon: string, accentColor: string = '#10b981') => `
  <div style="background: #193a59; padding: 20px; text-align: center; color: white;">
    <div style="font-size: 24px; margin-bottom: 8px;">${icon}</div>
    <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
      LENDURA CAPITAL
    </h1>
    <h2 style="margin: 0 0 4px 0; font-size: 18px; font-weight: 600;">${title}</h2>
    <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.9);">${subtitle}</p>
  </div>
`;

// Simplified email footer with essential contact info
const getEmailFooter = () => `
  <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 2px solid #193a59;">
    <h3 style="color: #193a59; margin: 0 0 12px 0; font-size: 18px; font-weight: 700;">LENDURA CAPITAL</h3>
    <p style="color: #64748b; margin: 0 0 12px 0; font-size: 14px;">Business Funding Solutions</p>
    
    <div style="margin-bottom: 12px;">
      <a href="tel:+13058347168" style="color: #193a59; text-decoration: none; font-weight: 600; margin-right: 20px;">📞 (305) 834-7168</a>
      <a href="mailto:sam@lenduracapital.com" style="color: #193a59; text-decoration: none; font-weight: 600;">✉️ sam@lenduracapital.com</a>
    </div>
    
    <p style="color: #64748b; font-size: 12px; margin: 0; line-height: 1.4;">
      Fast Business Funding • We respond within 24 hours
    </p>
  </div>
`;

// Simplified info row component
const createInfoRow = (label: string, value: string | number | undefined | null, highlight: boolean = false, icon: string = '') => {
  if (!value && value !== 0) return '';
  
  const bgColor = highlight ? '#fef3c7' : '#f8fafc';
  const textColor = highlight ? '#92400e' : '#1f2937';
  
  return `
    <div style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center; gap: 8px;">
        ${icon ? `<span style="font-size: 16px;">${icon}</span>` : ''}
        <span style="color: #6b7280; font-weight: 500; font-size: 14px;">${label}</span>
      </div>
      <div style="background: ${bgColor}; color: ${textColor}; font-weight: 600; padding: 6px 12px; border-radius: 6px; font-size: 14px; text-align: right;">
        ${value}
      </div>
    </div>
  `;
};

// Simplified section component
const createSection = (title: string, content: string, icon: string = '📊', accentColor: string = '#10b981') => `
  <div style="margin-bottom: 20px;">
    <div style="background: ${accentColor}; padding: 12px 16px; color: white;">
      <h2 style="margin: 0; font-size: 16px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 16px;">${icon}</span>
        ${title}
      </h2>
    </div>
    <div style="background: white; border: 1px solid #e5e7eb;">
      ${content}
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
        <div style="max-width: 600px; margin: 0 auto; background: white; border: 1px solid #e5e7eb;">
          
          ${getEmailHeader('New Loan Application', 'Lendura Capital', '📋')}

          <div style="padding: 20px;">
            <div style="background: #fef3c7; padding: 12px; margin-bottom: 16px; border-left: 4px solid #f59e0b;">
              <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 600;">Application Received: ${timestamp}</p>
            </div>

            ${createSection('Personal Information', personalInfo, '👤', '#2563eb')}
            ${createSection('Business Information', businessInfo, '🏢', '#059669')}
            ${createSection('Loan Details', loanInfo, '💰', '#dc2626')}

            <div style="background: #193a59; padding: 16px; text-align: center; color: white; margin-top: 20px;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">⚡ Action Required</h3>
              <p style="margin: 0 0 12px 0; font-size: 14px;">Contact applicant within 2 hours for optimal conversion</p>
              <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                <a href="tel:${data.phone || ''}" style="background: white; color: #193a59; padding: 8px 16px; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 14px;">📞 Call Now</a>
                <a href="mailto:${data.email}" style="background: #10b981; color: white; padding: 8px 16px; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 14px;">✉️ Email</a>
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
        <div style="max-width: 600px; margin: 0 auto; background: white; border: 1px solid #e5e7eb;">
          
          ${getEmailHeader('New Lead Capture', 'Lendura Capital', '🎯')}

          <div style="padding: 20px;">
            <div style="background: #dcfce7; padding: 12px; margin-bottom: 16px; border-left: 4px solid #16a34a; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
              <div>
                <p style="margin: 0; color: #15803d; font-size: 14px; font-weight: 600;">Lead Captured: ${timestamp}</p>
              </div>
              <div>${qualificationBadge}</div>
            </div>

            ${createSection('Contact Information', contactInfo, '👤', '#10b981')}
            ${createSection('Qualification Details', qualificationInfo, '📊', '#f59e0b')}

            ${data.message ? `
            <div style="margin-bottom: 16px;">
              <div style="background: #10b981; padding: 12px 16px; color: white;">
                <h2 style="margin: 0; font-size: 16px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 16px;">💬</span>
                  Message
                </h2>
              </div>
              <div style="background: white; border: 1px solid #e5e7eb; padding: 16px;">
                <p style="margin: 0; color: #374151; line-height: 1.6; font-size: 14px; white-space: pre-wrap;">
                  ${data.message}
                </p>
              </div>
            </div>
            ` : ''}

            <div style="background: #ef4444; padding: 16px; text-align: center; color: white; margin-top: 20px;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">🚨 Time-Sensitive Lead</h3>
              <p style="margin: 0 0 12px 0; font-size: 14px;">Contact within 5 minutes for highest conversion</p>
              <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                <a href="tel:${data.phone || data.phoneNumber || ''}" style="background: white; color: #ef4444; padding: 8px 16px; border-radius: 4px; text-decoration: none; font-weight: 700; font-size: 14px;">📞 Call NOW</a>
                <a href="mailto:${data.email}" style="background: #10b981; color: white; padding: 8px 16px; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 14px;">✉️ Email</a>
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
        <div style="max-width: 600px; margin: 0 auto; background: white; border: 1px solid #e5e7eb;">
          
          ${getEmailHeader('New Contact Inquiry', 'Lendura Capital', '💬')}

          <div style="padding: 20px;">
            <div style="background: #dbeafe; padding: 12px; margin-bottom: 16px; border-left: 4px solid #3b82f6;">
              <p style="margin: 0; color: #1d4ed8; font-size: 14px; font-weight: 600;">Contact Received: ${timestamp}</p>
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

            <div style="background: #193a59; padding: 16px; text-align: center; color: white; margin-top: 20px;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">📞 Follow-up Required</h3>
              <p style="margin: 0 0 12px 0; font-size: 14px;">Contact promptly for excellent service</p>
              <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                <a href="tel:${data.phone || data.phoneNumber || ''}" style="background: white; color: #193a59; padding: 8px 16px; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 14px;">📞 Call Back</a>
                <a href="mailto:${data.email}" style="background: #10b981; color: white; padding: 8px 16px; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 14px;">✉️ Email</a>
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