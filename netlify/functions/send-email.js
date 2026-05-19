const nodemailer = require('nodemailer');
const crypto = require('crypto');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

const ENCRYPTION_KEY = process.env.EMAIL_ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');
const IV_LENGTH = 16;
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000;

function encrypt(data) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted,
    authTag: authTag,
    timestamp: Date.now()
  };
}

function decrypt(encryptedObj) {
  const { iv, encryptedData, authTag, timestamp } = encryptedObj;
  
  if (Date.now() - timestamp > TOKEN_EXPIRY) {
    throw new Error('Verification link expired');
  }

  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    Buffer.from(iv, 'hex')
  );
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return JSON.parse(decrypted);
}

function generateMessageId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `<${timestamp}.${random}@portfolio.vincentdelacruz.com>`;
}

function formatDate() {
  return new Date().toUTCString();
}

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body);

    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'All fields are required' })
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email address' })
      };
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    await transporter.verify();

    const encryptedToken = encrypt({ name, email, subject, message });
    const tokenString = Buffer.from(JSON.stringify(encryptedToken)).toString('base64url');
    const siteUrl = process.env.SITE_URL || 'https://your-portfolio.netlify.app';
    const verificationUrl = `${siteUrl}/.netlify/functions/verify-email?token=${tokenString}`;

    const verificationEmail = {
      from: {
        name: 'Vincent Dela Cruz Portfolio',
        address: process.env.GMAIL_USER
      },
      to: {
        name: name,
        address: email
      },
      replyTo: process.env.GMAIL_USER,
      subject: 'Please verify your email to send your message',
      messageId: generateMessageId(),
      date: formatDate(),
      headers: {
        'X-Mailer': 'Portfolio Verification',
        'List-Unsubscribe': `<mailto:${process.env.GMAIL_USER}?subject=Unsubscribe>`
      },
      text: `Hi ${name},\n\nThank you for contacting me! To prevent spam, please verify your email by clicking the link below:\n\n${verificationUrl}\n\nThis link will expire in 24 hours.\n\nIf you didn't submit this form, please ignore this email.\n\nBest regards,\nVincent Dela Cruz`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1e6bff;">Hi ${name},</h2>
          <p>Thank you for contacting me! To prevent spam, please verify your email by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="background: #1e6bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Verify Email & Send Message</a>
          </div>
          <p style="color: #666; font-size: 14px;">Or copy and paste this link into your browser:</p>
          <p style="background: #f8f9fa; padding: 10px; border-radius: 5px; word-break: break-all; font-size: 12px; color: #666;">${verificationUrl}</p>
          <p style="color: #888; font-size: 12px; margin-top: 20px;">This link will expire in 24 hours. If you didn't submit this form, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #888; font-size: 12px;">Best regards,<br>Vincent Dela Cruz</p>
        </body>
        </html>
      `
    };

    await transporter.sendMail(verificationEmail);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        message: 'Verification email sent. Please check your inbox and click the verification link to send your message.',
        requiresVerification: true
      })
    };
  } catch (error) {
    console.error('Email error:', error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
