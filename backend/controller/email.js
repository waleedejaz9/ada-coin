import nodemailer from "nodemailer";
import config from "../config.js";

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.user,
    pass: config.pass,
  },
});

var mailOptions = {
  from: config.user,
  to: "myfriend@yahoo.com",
  subject: "Sending Email using Node.js",
  html: "",
};

const sendEmail = async (subject, to, body) => {
  mailOptions.subject = subject;
  mailOptions.to = to;
  mailOptions.html = body;
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export { sendEmail };
