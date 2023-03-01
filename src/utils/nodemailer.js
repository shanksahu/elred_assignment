var nodemailer = require('nodemailer')

const emailService = (userEmail, html) => {
    var smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: "shashank.leocoders@gmail.com",
            pass: "sfbahtgwqwunjlmr"
        }
    });
    var mailOptions = {
        from: "shashank.leocoders@gmail.com",
        to: userEmail,
        subject: 'OTP',
        html: html
    }
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("email sent");;
        }
    });
}

module.exports = { emailService }