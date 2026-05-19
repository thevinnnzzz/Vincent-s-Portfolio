const nodemailer = require('nodemailer');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

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
          <p style="margin-top: 20px; color: #888; font-size: 12px;">This email was sent from your portfolio contact form.</p>
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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Email sent successfully' })
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
