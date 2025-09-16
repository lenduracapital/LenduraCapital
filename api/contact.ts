import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      firstName, 
      lastName,
      email, 
      phone,
      company,
      businessType,
      timeInBusiness,
      monthlyRevenue,
      creditScore,
      fundingAmount,
      fundingPurpose,
      timeline,
      message
    } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    // Format timestamp
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

    // Create email content
    const emailContent = `
New Contact Form Submission - Lendura Capital

Timestamp: ${timestamp}
Source: Home Page Contact Form

Customer Information:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Phone: ${phone}
- Company: ${company || 'Not provided'}
- Business Type: ${businessType || 'Not provided'}
- Time in Business: ${timeInBusiness || 'Not provided'}
- Monthly Revenue: ${monthlyRevenue || 'Not provided'}
- Credit Score: ${creditScore || 'Not provided'}
- Funding Amount: ${fundingAmount || 'Not provided'}
- Funding Purpose: ${fundingPurpose || 'Not provided'}
- Timeline: ${timeline || 'Not provided'}
- Message: ${message || 'Not provided'}

Please follow up with this potential client promptly.

This message was automatically generated from the Lendura Capital website contact form.
    `.trim();

    // Send email using SendGrid
    if (process.env.SENDGRID_API_KEY) {
      try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const leadId = `CF-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        
        const msg = {
          to: 'sam@lenduracapital.com',
          from: 'subs@lenduracapital.com',
          subject: `New Contact Form Lead #${leadId} - ${firstName} ${lastName}`,
          text: emailContent,
        };

        await sgMail.send(msg);
        
        return res.status(200).json({ 
          success: true, 
          message: "Contact form submitted successfully!",
          leadId: leadId
        });
      } catch (emailError: any) {
        console.error('SendGrid email error:', emailError);
        return res.status(500).json({ 
          error: "Failed to send email notification",
          details: emailError.message 
        });
      }
    } else {
      return res.status(200).json({ 
        success: true, 
        message: "Contact form submitted successfully!" 
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: "Internal server error" });
  }
}