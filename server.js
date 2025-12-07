import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT) || 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, project, message } = req.body;

    // Validate required fields
    if (!firstName || !email) {
      return res.status(400).json({
        success: false,
        error: 'First name and email are required'
      });
    }

    const fullName = `${firstName} ${lastName || ''}`.trim();

    // Email content
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER, // Send to yourself
      replyTo: email,
      subject: `New Inquiry from ${fullName} - Paradise RealEstate`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0B1525 0%, #1a2d4a 100%); padding: 30px; text-align: center;">
            <h1 style="color: #C5A059; margin: 0; font-size: 28px;">New Contact Inquiry</h1>
            <p style="color: #ffffff; margin-top: 10px;">Paradise RealEstate - Sustainable Luxury</p>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #0B1525; border-bottom: 2px solid #C5A059; padding-bottom: 10px;">Contact Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #666; width: 140px;"><strong>Name:</strong></td>
                <td style="padding: 10px 0; color: #333;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666;"><strong>Email:</strong></td>
                <td style="padding: 10px 0; color: #333;"><a href="mailto:${email}" style="color: #C5A059;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666;"><strong>Phone:</strong></td>
                <td style="padding: 10px 0; color: #333;">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666;"><strong>Project Interest:</strong></td>
                <td style="padding: 10px 0; color: #333;">${project || 'Not specified'}</td>
              </tr>
            </table>
            
            <h3 style="color: #0B1525; margin-top: 25px; border-bottom: 2px solid #C5A059; padding-bottom: 10px;">Message</h3>
            <p style="color: #333; line-height: 1.6; background: #fff; padding: 15px; border-radius: 5px; border-left: 4px solid #C5A059;">
              ${message || 'No message provided'}
            </p>
          </div>
          
          <div style="background: #0B1525; padding: 20px; text-align: center;">
            <p style="color: #888; margin: 0; font-size: 12px;">
              This inquiry was submitted through the Paradise RealEstate website contact form.
            </p>
          </div>
        </div>
      `,
      text: `
New Contact Inquiry - Paradise RealEstate

Name: ${fullName}
Email: ${email}
Phone: ${phone || 'Not provided'}
Project Interest: ${project || 'Not specified'}

Message:
${message || 'No message provided'}

---
This inquiry was submitted through the Paradise RealEstate website contact form.
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send auto-reply to the customer
    const autoReplyOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Thank you for contacting Paradise RealEstate',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0B1525 0%, #1a2d4a 100%); padding: 30px; text-align: center;">
            <h1 style="color: #C5A059; margin: 0; font-size: 28px;">Thank You!</h1>
            <p style="color: #ffffff; margin-top: 10px;">Paradise RealEstate - Sustainable Luxury</p>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Dear ${firstName},
            </p>
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Thank you for your interest in Paradise RealEstate. We have received your inquiry and our team will get back to you within 24-48 hours.
            </p>
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              In the meantime, feel free to reach out to us directly:
            </p>
            <ul style="color: #333; font-size: 16px; line-height: 1.8;">>
              <li>Email: Info@preuae.com</li>
            </ul>
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Best regards,<br>
              <strong style="color: #C5A059;">The Paradise RealEstate Team</strong>
            </p>
          </div>
          
          <div style="background: #0B1525; padding: 20px; text-align: center;">
            <p style="color: #888; margin: 0; font-size: 12px;">
              © ${new Date().getFullYear()} Paradise RealEstate. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(autoReplyOptions);

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
