const nodemailer = require('nodemailer')

const sendEmail = async(options) =>{
//1. create a transporter
//2. define your options
//3. send the actual email
 
    //1 creating the transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
      }
    })


    //2. defining the options 
    const mailOptions = {
        from: 'Princewill opah <popo@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html
    }

    // 3. send the email
   await  transporter.sendMail(mailOptions);


}; 

module.exports = sendEmail