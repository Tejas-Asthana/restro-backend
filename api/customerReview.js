const express = require("express");
const config = require("config");
var Router = express.Router();

const nodemailer = require("nodemailer");

let tempEmail;

Router.route("/").post((req, res) => {
  if (req.body.email) {
    let { name, email, review } = req.body;
    //   res.send(`Hello there \n
    //   Name: ${name},
    //   Email: ${email},
    //   Review: ${review}
    // `);
    res.redirect("/");

    tempEmail = {
      from: `"${config.senderName}" <--${config.senderEmail}-->`, // sender address
      to: `${config.receiverEmail}`, // list of receivers
      subject: `Someone just gave you customer review !`, // Subject line
      html: `
    Hey !<br>
    Someone just gave you customer review <br />
    <b>Name:</b> ${name}<br>
    <b>Email:</b> ${email}<br>
    <b>Review:</b> ${review}<br>
    Adios !
  `, // html body
    };
  } else {
    let { name, review } = req.body;
    // res.send(`Hello there <br>
    // <b>Name:</b> ${name}<br>
    // <b>Review:</b> ${review}<br>
    // `);

    res.redirect("/");

    tempEmail = {
      from: `"${config.senderName}" <--${config.senderEmail}-->`, // sender address
      to: `${config.receiverEmail}`, // list of receivers
      subject: `Someone just gave you customer review !`, // Subject line
      html: `
      Hey !<br>
      Someone just gave you customer review <br />
      <b>Name:</b> ${name}<br>
      <b>Review:</b> ${review}<br>
      Adios !
    `, // html body
    };
  }

  async function main() {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${config.senderEmail}`, // sender_email_here
        pass: `${config.pass}`, // sender_email_password_here
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail(tempEmail);

    console.log("Message sent: %s", info.messageId);
  }

  main().catch(console.error);
});

module.exports = Router;
