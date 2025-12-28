const nodemailer = require('nodemailer');
const logger = require('../utils/logger');
const createCustomer = require('../database/interface').createCustomerUtil;

const toBool = (v) => v === true || v === 'true' || v === '1';

const escapeHtml = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// --- transporter created once ---
const senderEmail = process.env.SENDER_EMAIL;
const senderPassword = process.env.SENDER_PASSWORD;
const smtpHost = (process.env.SMTP_HOST || '').trim();
const smtpPort = Number(process.env.SMTP_PORT || 465);
const smtpSecure = process.env.SMTP_SECURE ? toBool(process.env.SMTP_SECURE) : smtpPort === 465;

let transporter = null;
if (senderEmail && senderPassword && smtpHost) {
  transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: { user: senderEmail, pass: senderPassword },
    // pool can reduce latency if you get bursts:
    pool: true, maxConnections: 2, maxMessages: 100
  });
}

const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const isParts = toBool(req.body.isParts);
    const isInquiry = toBool(req.body.isInquiry);

    if (!name || !email || !phone || !subject) {
      return res.status(400).json({ success: false, error: 'Name, email, phone, and subject are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email address' });
    }

    const destinationEmail = isParts
        ? process.env.PARTS_EMAIL
        : isInquiry
        ? process.env.INQUIRY_EMAIL
        : process.env.DESTINATION_EMAIL;

    if (!transporter || !destinationEmail) {
      logger.error('Email environment variables not properly configured', {
        senderEmail: !!senderEmail,
        senderPassword: !!senderPassword,
        destinationEmail: !!destinationEmail,
        smtpHost: !!smtpHost,
        smtpPort
      });
      return res.status(500).json({ success: false, error: 'Server email configuration error' });
    }

    // Prepare everything needed BEFORE responding
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);
    const subjectPrefix = isParts ? '[Parts Request]' : isInquiry ? '[Inquiry]' : '[Contact Form]';
    const mail = {
      from: `"${safeName}" <${senderEmail}>`,
      to: destinationEmail,
      replyTo: email,
      subject: `${subjectPrefix} ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color:#333;border-bottom:2px solid #007bff;padding-bottom:10px;">${safeSubject}</h2>
          <div style="background:#f8f9fa;padding:20px;border-radius:5px;margin:20px 0;">
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Phone:</strong> ${safePhone}</p>
          </div>
          ${message ? `
            <div style="margin: 20px 0;">
              <h3 style="color:#333;">Message:</h3>
              <p style="background:#fff;padding:15px;border-left:4px solid #007bff;white-space:pre-wrap;">${safeMessage}</p>
            </div>
          ` : ''}
          <div style="margin-top:30px;padding-top:20px;border-top:1px solid #ddd;font-size:12px;color:#666;">
            <p>This email was sent from the contact form on your website.</p>
            <p>Time: ${escapeHtml(new Date().toLocaleString())}</p>
          </div>
        </div>
      `,
      text: `Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

${message ? `Message:\n${message}\n\n` : ''}---\nTime: ${new Date().toLocaleString()}`
    };

    res.status(202).json({
      success: true,
      message: 'Contact form received.'
    });
    // Save to database
    createCustomer({name: name, email: email, phone: phone, receivedAt: new Date()}, {subject: subject, message: message});

    // Send email in background
    setImmediate(async () => {
      try {
        await transporter.sendMail(mail);
        logger.info('Contact email sent', { to: destinationEmail, subject });
      } catch (err) {
        logger.error('Background email send failed', err);
      }
    });

  } catch (error) {
    logger.error('Contact form submission error:', error);
    return res.status(500).json({ success: false, error: 'Failed to submit contact form.' });
  }
};

module.exports = { submitContactForm };