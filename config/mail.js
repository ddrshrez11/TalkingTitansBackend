const nodemailer = require("nodemailer");
const contactEmail = {
  host: "SMTP.titan.email",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_TO_EMAIL,
    pass: process.env.SMTP_TO_PASSWORD,
  },
};
const toMail =
  "yunipshrestha@gmail.com,marketing@shardaproduction.com.np,jo.ashia00@gmail.com,sabindra.photographer@gmail.com";
const sendNewUserEmail = (newData) => {
  let transporter = nodemailer.createTransport(contactEmail);

  const mailOptions = {
    from: "registration@shardaproduction.com",
    to: toMail,
    subject: "New Registration",
    text: "Test Email",
    html: `
    <ul>
        <li>name: ${newData.name}</li>
        <li>address: ${newData.address}</li>
        <li>phone: ${newData.phone}</li>
        <li>email: ${newData.email}</li>
        <li>age: ${newData.age}</li>
        <li>eduLevel: ${newData.eduLevel}</li>
        <li>eduInstitution: ${newData.eduInstitution}</li>
        <li>participated: ${newData.participated}</li>
        <li>language: ${newData.language}</li>  
    </ul>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error.message);
    }
    console.log("Message sent: %s", info.messageId);
    return info.messageId;
  });
};
// const sendEmail = nodemailer.createTransport(contactEmail);
module.exports = { sendNewUserEmail };
