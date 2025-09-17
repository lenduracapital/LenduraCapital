import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendContactFormEmail } from '../server/utils/sendgrid-service';

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

    // Send email using new SendGrid service
    try {
      await sendContactFormEmail({
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
      });
      console.log('✅ Contact form email sent successfully via API');
      
      return res.status(200).json({ 
        success: true, 
        message: "Contact form submitted successfully! We'll contact you within 24 hours."
      });
    } catch (emailError: any) {
      console.error('⚠️  Failed to send contact form email via API:', emailError);
      // Return success even if email fails to not block user experience
      return res.status(200).json({ 
        success: true, 
        message: "Contact form submitted successfully!",
        warning: "Email notification may be delayed"
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: "Internal server error" });
  }
}