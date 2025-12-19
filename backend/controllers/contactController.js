import nodemailer from 'nodemailer';

/**
 * Submit contact form - sends email using environment variables
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message, isParts } = req.body;

    // Validate request body
    if (!name || !email || !phone || !subject) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, phone, and subject are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address'
      });
    }

    // Get email configuration from environment variables
    const senderEmail = process.env.SENDER_EMAIL;
    const senderPassword = process.env.SENDER_PASSWORD;
    const destinationEmail = isParts
      ? process.env.PARTS_CONTACT_EMAIL
      : process.env.DESTINATION_EMAIL;

    // Validate environment variables are set
    if (!senderEmail || !senderPassword || !destinationEmail) {
      console.error('Email environment variables not properly configured');
      console.error({
        senderEmail: !!senderEmail,
        senderPassword: !!senderPassword,
        destinationEmail: !!destinationEmail
      });
      return res.status(500).json({
        success: false,
        error: 'Server email configuration error'
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'smtp',
      auth: {
        user: senderEmail,
        pass: senderPassword
      }
    });

    // Email content
    const mailOptions = {
      from: `"${name}" <${senderEmail}>`,
      to: destinationEmail,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Phone:</strong> ${phone}</p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
          </div>

          ${message ? `
            <div style="margin: 20px 0;">
              <h3 style="color: #333;">Message:</h3>
              <p style="background-color: #fff; padding: 15px; border-left: 4px solid #007bff; white-space: pre-wrap;">
                ${message}
              </p>
            </div>
          ` : ''}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
            <p>This email was sent from the contact form on your website.</p>
            <p>Time: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

${message ? `Message:\n${message}` : ''}

---
This email was sent from the contact form on your website.
Time: ${new Date().toLocaleString()}
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully. We will get back to you soon.'
    });

  } catch (error) {
    console.error('Contact form submission error:', error);

    // Handle specific nodemailer errors
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        error: 'Email authentication failed. Please check email configuration.'
      });
    }

    if (error.code === 'ECONNECTION') {
      return res.status(500).json({
        success: false,
        error: 'Failed to connect to email server.'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later.'
    });
  }
};
