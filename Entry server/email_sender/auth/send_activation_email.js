const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
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