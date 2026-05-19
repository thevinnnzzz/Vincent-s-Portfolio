const nodemailer = require('nodemailer');
const crypto = require('crypto');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS'
};

const ENCRYPTION_KEY = process.env.EMAIL_ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');
const IV_LENGTH = 16;
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000;

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

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  try {
    const token = event.queryStringParameters?.token;
    
    if (!token) {
      return {
        statusCode: 400,
        headers: { ...headers, 'Content-Type': 'text/html' },
        body: '<h1>Invalid verification link</h1><p>No token provided.</p>'
      };
    }

    let encryptedToken;
    try {
      encryptedToken = JSON.parse(Buffer.from(token, 'base64url').toString('utf8'));
    } catch (e) {
      return {
        statusCode: 400,
        headers: { ...headers, 'Content-Type': 'text/html' },
        body: '<h1>Invalid verification link</h1><p>The verification token is malformed.</p>'
      };
    }

    const { name, email, subject, message } = decrypt(encryptedToken);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    await transporter.verify();

    const mailToVincent = {
      from: {
        name: 'Portfolio Contact Form',
        address: process.env.GMAIL_USER
      },
      to: process.env.GMAIL_USER,
      replyTo: {
        name: name,
        address: email
      },
      subject: `Portfolio Contact: ${subject}`,
      messageId: generateMessageId(),
      date: formatDate(),
      headers: {
        'X-Mailer': 'Portfolio Contact Form',
        'X-Priority': '3',
        'List-Unsubscribe': `<mailto:${process.env.GMAIL_USER}?subject=Unsubscribe>`
      },
      text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1e6bff; border-bottom: 2px solid #1e6bff; padding-bottom: 10px;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 100px;">Name:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Subject:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${subject}</td></tr>
          </table>
          <h3 style="color: #555;">Message:</h3>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #1e6bff;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p style="margin-top: 20px; color: #888; font-size: 12px;">This email was sent from your portfolio contact form after email verification.</p>
        </body>
        </html>
      `
    };

    const mailToVisitor = {
      from: {
        name: 'Vincent Dela Cruz',
        address: process.env.GMAIL_USER
      },
      to: {
        name: name,
        address: email
      },
      replyTo: process.env.GMAIL_USER,
      subject: `Re: ${subject} - Thank you for contacting me`,
      messageId: generateMessageId(),
      date: formatDate(),
      inReplyTo: mailToVincent.messageId,
      references: mailToVincent.messageId,
      headers: {
        'X-Mailer': 'Portfolio Auto-Reply',
        'Auto-Submitted': 'auto-replied',
        'Precedence': 'bulk',
        'List-Unsubscribe': `<mailto:${process.env.GMAIL_USER}?subject=Unsubscribe>`
      },
      text: `Hi ${name},\n\nThank you for your message! I've received your inquiry regarding "${subject}".\n\nI'll get back to you as soon as possible.\n\nBest regards,\nVincent Dela Cruz\n\n---\nThis is an automated response. Please do not reply to this email.`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1e6bff;">Hi ${name},</h2>
          <p>Thank you for your message! I've received your inquiry regarding "<strong>${subject}</strong>".</p>
          <p>I'll get back to you as soon as possible.</p>
          <br>
          <p>Best regards,<br><strong>Vincent Dela Cruz</strong></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #888; font-size: 12px;">This is an automated response from Vincent's Portfolio. Please do not reply to this email.</p>
        </body>
        </html>
      `
    };

    await Promise.all([
      transporter.sendMail(mailToVincent),
      transporter.sendMail(mailToVisitor)
    ]);

    const successHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Message Sent Successfully</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f5f7fa;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
          }
          .container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            max-width: 500px;
            text-align: center;
          }
          .success-icon {
            font-size: 64px;
            color: #10b981;
            margin-bottom: 20px;
          }
          h1 {
            color: #1e6bff;
            margin-bottom: 15px;
          }
          p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 20px;
          }
          .btn {
            display: inline-block;
            background: #1e6bff;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin-top: 10px;
          }
          .btn:hover {
            background: #1556cc;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="success-icon">✓</div>
          <h1>Message Sent Successfully!</h1>
          <p>Hi ${name}, your message regarding "<strong>${subject}</strong>" has been sent to Vincent. He'll get back to you as soon as possible.</p>
          <a href="/" class="btn">Back to Portfolio</a>
        </div>
      </body>
      </html>
    `;

    return {
      statusCode: 200,
      headers: { ...headers, 'Content-Type': 'text/html' },
      body: successHtml
    };
  } catch (error) {
    console.error('Verification error:', error.message);
    
    const errorHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Failed</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f5f7fa;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
          }
          .container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            max-width: 500px;
            text-align: center;
          }
          .error-icon {
            font-size: 64px;
            color: #ef4444;
            margin-bottom: 20px;
          }
          h1 {
            color: #ef4444;
            margin-bottom: 15px;
          }
          p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 20px;
          }
          .btn {
            display: inline-block;
            background: #1e6bff;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin-top: 10px;
          }
          .btn:hover {
            background: #1556cc;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="error-icon">✗</div>
          <h1>Verification Failed</h1>
          <p>${error.message === 'Verification link expired' ? 'This verification link has expired. Please submit the contact form again to receive a new verification link.' : 'The verification link is invalid or has already been used.'}</p>
          <a href="/" class="btn">Back to Portfolio</a>
        </div>
      </body>
      </html>
    `;

    return {
      statusCode: error.message === 'Verification link expired' ? 410 : 400,
      headers: { ...headers, 'Content-Type': 'text/html' },
      body: errorHtml
    };
  }
};
