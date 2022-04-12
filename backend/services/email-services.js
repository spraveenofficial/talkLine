import nodemailer from "nodemailer";

class Email {
  async sendSignupOtp(email, otp) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: email,
      subject: "OTP ! Welcome to TalkLine. ",
      text: `Hey there! Welcome to TalkLine. Your OTP is ${otp}. This Otp will be valid for 2 minutes only. \n\n\n\nRegards,\nTalkLine Team.`,
    };
    transporter.sendMail(mailOptions);
  }
}

export default new Email();
