var nodemailer = require('nodemailer');
require('dotenv').config({ path: '/home/runner/CodeDoor-FSWD-Entry-server/submodules/.env'});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});




async function send_activation_email(to_mail, user_name, activation_code){
  var mailOptions = {
    from: process.env.EMAIL,
    to: to_mail,
    subject: 'no-reply: Activate your Venner account',
    html: `<h3>Activate your Venner account</h3><p>Hello ${user_name}!<br>Thanks for registering on Venner. Please activate your account by clicking in the following link: <a href="https://codedoor-fswd-entry-server.andrescamilocamilo.repl.co/activation/${activation_code}" > https://codedoor-fswd-entry-server.andrescamilocamilo.repl.co/activation/${activation_code} </a><br>Best regards!</p>`
  };

  try{
    let email = await transporter.sendMail(mailOptions);
    return true;
  }
  catch (err){
    console.log(err);
    return false
  }
}

exports.send_activation_email = send_activation_email;

/*
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});*/