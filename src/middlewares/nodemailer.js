  
"use strict";
const nodemailer = require("nodemailer");

// https://accounts.google.com/b/0/DisplayUnlockCaptcha

module.exports= async function main(email, html,text) {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
      user: "paruyrars@gmail.com", 
      pass: "paruyrars!@#", 
    },
  });
  let info = await transporter.sendMail({
    from: '"ACTIVATION 👻" <paruyrars@gmail.com>',
    to:email,
    subject: "Hello ✔", 
    text:`${text}`, 
    html:html
  }); 
}   