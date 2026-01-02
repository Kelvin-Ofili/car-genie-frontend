# Backend Email Integration Guide

## Overview
This document outlines the email sending system needed for the contact dealer feature.

## Email Configuration

### Environment Variables (Backend .env)
```env
EMAIL_USER=kelvinofili1@gmail.com
EMAIL_APP_PASSWORD=your_gmail_app_password
TEST_RECIPIENT_EMAIL=kryptofili1@gmail.com
```

### Email Flow
1. User fills out contact form on frontend
2. Frontend sends request to `/api/send-email` endpoint
3. Backend sends email from `kelvinofili1@gmail.com`
4. For testing: all emails go to `kryptofili1@gmail.com`
5. Email contains user details so dealership can contact them directly

## Backend Implementation (Node.js/Express)

### Install Required Package
```bash
npm install nodemailer
```

### Email Endpoint (`/api/send-email`)

```javascript
const nodemailer = require('nodemailer');

// Create email transporter (Gmail example)
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // kelvinofili1@gmail.com
    pass: process.env.EMAIL_APP_PASSWORD, // Gmail App Password
  },
});

// POST /api/send-email
app.post('/api/send-email', verifyToken, async (req, res) => {
  try {
    const { dealerEmail, carName, senderName, senderEmail, senderPhone, message } = req.body;

    // Validate required fields
    if (!dealerEmail || !carName || !senderName || !senderEmail || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // For testing, always send to kryptofili1@gmail.com
    const recipientEmail = process.env.TEST_RECIPIENT_EMAIL || dealerEmail;

    // Email template
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Lead from CarGenie</h2>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Vehicle Interest</h3>
          <p><strong>Car:</strong> ${carName}</p>
          <p><strong>Dealer Email:</strong> ${dealerEmail}</p>
        </div>
        
        <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e40af;">Customer Information</h3>
          <p><strong>Name:</strong> ${senderName}</p>
          <p><strong>Email:</strong> ${senderEmail}</p>
          ${senderPhone ? `<p><strong>Phone:</strong> ${senderPhone}</p>` : ''}
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h3 style="margin-top: 0;">Message</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
          <p>This is an automated message from CarGenie - Your AI Car Matchmaker</p>
          <p>The customer is expecting direct contact from the dealership.</p>
        </div>
      </div>
    `;

    // Send email
    const mailOptions = {
      from: \`"CarGenie" <\${process.env.EMAIL_USER}>\`,
      to: recipientEmail,
      subject: \`New Lead: \${senderName} interested in \${carName}\`,
      html: emailContent,
      replyTo: senderEmail, // Allow dealer to reply directly to customer
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});
```

## Gmail App Password Setup

1. Go to Google Account Settings: https://myaccount.google.com/
2. Navigate to Security → 2-Step Verification
3. Scroll down to "App passwords"
4. Generate a new app password for "Mail"
5. Copy the 16-character password
6. Add to backend .env file as `EMAIL_APP_PASSWORD`

## Testing Flow

1. Start backend server with proper environment variables
2. User fills contact form on frontend
3. Email is sent from `kelvinofili1@gmail.com`
4. Email arrives at `kryptofili1@gmail.com` (testing recipient)
5. Email contains all customer details for follow-up

## Production Deployment

For production, update the email endpoint logic:
```javascript
// Remove test recipient override
const recipientEmail = dealerEmail; // Send to actual dealer
```

## Security Notes

- Never commit `EMAIL_APP_PASSWORD` to version control
- Use Firebase token authentication on the endpoint
- Validate all user inputs before sending emails
- Rate limit the email endpoint to prevent abuse
- Consider adding spam protection (e.g., reCAPTCHA)
