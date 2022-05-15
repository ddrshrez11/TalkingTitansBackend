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
const toMail = process.env.MAIL_TO
const sendNewUserNotificationEmail = (newData) => {
  let transporter = nodemailer.createTransport(contactEmail);

  const mailOptions = {
    from: "registration@shardaproduction.com",
    to: toMail,
    subject: "New Registration",
    text: "Test Email",
    html: `
    <ul>
        <li>name: ${newData.p_id}</li>
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

const sendTokenNumEmail = (newData) => {
  let transporter = nodemailer.createTransport(contactEmail);

  const mailOptions = {
    from: "registration@shardaproduction.com",
    to: newData.email,
    subject: "Talking Titans 2 - Registration Token",
    text: `Thank you for your participation!
    Your token number for Khalti Talking Titans 2 is TT2-${newData.p_id}.
    (To confirm your registration, please make sure you have paid the registration fee and updated your Khalti KYC.)
    
    For any queries, contact 9808723759 | 9818855727 | 9860132809`,
    html: `
    <div style="font-size: 20px;">
    <h2>Thank you for your participation!</h2>
    Your token number for Khalti Talking Titans 2 is <h1>TT2-${newData.p_id}.</h1>
<em>(To confirm your registration, please make sure you have paid the registration fee and updated your Khalti KYC.)</em>
<br />

For any queries, contact 9808723759 | 9818855727 | 9860132809
</div>`,
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
module.exports = { sendNewUserNotificationEmail, sendTokenNumEmail };
