// server/utils/email.js
const nodemailer = require('nodemailer');

// Create a transporter object using Gmail
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// Function to send email
const sendScheduleEmail = async (to, content) => {
  const mailOptions = {
    from: 'Skin Decoder <noreply@skin-decoder.com>',
    to,
    subject: 'Your Personalized Skincare Schedule',
    text: content,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2a2a2a;">Your Skin Cycling Schedule</h2>
        ${content.split('\n\n').map(section => `
          <div style="margin-bottom: 2rem;">
            ${section.replace(/\n/g, '<br>')}
          </div>
        `).join('')}
        <p style="color: #666; margin-top: 2rem;">
          Need to make adjustments? Log in to your Skin Decoder account to update your preferences.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendScheduleEmail };