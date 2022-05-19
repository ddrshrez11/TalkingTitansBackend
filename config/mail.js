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
const toMail = process.env.MAIL_TO;
const sendNewUserNotificationEmail = (newData) => {
  let transporter = nodemailer.createTransport(contactEmail);

  const mailOptions = {
    from: "registration@shardaproduction.com",
    to: toMail,
    subject: "New Registration",
    text: "Test Email",
    html: `
    <ul>
        <li>pId: ${newData.pId}</li>
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
    Your token number for Khalti Talking Titans 2 is TT2-${newData.pId}.

    You need to compulsorily bring your Citizenship for verification on the mentorship day.

    To confirm your registration, please make sure you have paid the registration fee. You can make the payment online in Khalti ID: 9818855727 (either from Khalti app or through fonepay). For offline payment, you can visit our registration office at Dursikshya Education Network, Kantipath (Opposite of Naach Ghar), Kathmandu.

    And to receive the NPR.100/- Khalti cash back on your registration fee, get your Khalti cash back coupon on the mentorship day.
    
    For any queries, call/Whatsapp: 9808723759 | 9818855727 | 9860132809
    Follow us to get all the Event Updates: https://www.facebook.com/shardaproduction
    `,
    html: `
    <div style="font-size: 20px;">
    <h2>Thank you for your participation!</h2>
    Your token number for Khalti Talking Titans 2 is <h1>TT2-${newData.pId}.</h1>
    <p><strong>You need to compulsorily bring your Citizenship for verification on the mentorship day.</strong></p>
    <p>
      To confirm your registration, please make sure you have paid the registration fee. You can make the payment online in Khalti ID: 9818855727 (either from Khalti app or through fonepay). For offline payment, you can visit our registration office at Dursikshya Education Network, Kantipath (Opposite of Naach Ghar), Kathmandu. <br />
      & to receive the NPR.100/- Khalti Cash Back on your registration fee, get your Khalti Cash Back coupon on the mentorship day.
    </p>
    <p>For any queries, Call or Whatsapp:  9808723759 | 9818855727 | 9860132809 </p>
    <p>Follow us to get all the Event Updates: <a href="https://www.facebook.com/shardaproduction">Facebook Page</a> </p>
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
