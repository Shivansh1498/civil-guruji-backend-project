import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rawatshivansh@gmail.com",
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export function sendNotificationEmail(email) {
  const mailOptions = {
    from: "rawatshivansh@gmail.com",
    to: email,
    subject: "Inactive Account Notification",
    text: "Your account has been inactive for a while. Please login to keep it active.",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
