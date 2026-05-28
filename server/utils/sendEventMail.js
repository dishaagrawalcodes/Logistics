const nodemailer = require("nodemailer");

const sendEventMail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // TLS
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html
  });
};

module.exports = sendEventMail;
