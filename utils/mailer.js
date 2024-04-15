const nodemailer = require("nodemailer");

const mailOptions = {
  from: `"Teezens" <iyodukunda@gmail.com>`,
  to: "",
  subject: "",
  text: "",
};

exports.sendMail = async (options) => {
  try {
    const info = await transporter.sendMail(options);
    console.log("Email sent: ", info.response);
  } catch (err) {
    console.error("Error sending email: ", err);
  }
};

exports.sendVerificationMail = (mail, link, name) => {
  const options = {
    ...mailOptions, // Sender email address
    to: mail, // Recipient email address
    subject: "Account Verification Required: Please Verify Your Account",
    text: `
      Hi ${name},
      Thank you for signing up with us! 
      To complete your registration and gain access to all features, please click the link below to verify your email address:
      - Please click here to verify your account ${link}
      If you did not create an account with us, please disregard this email.
      Regards,
      Agency
    `,
  };

  sendMail(options); // Send the verification email
};
