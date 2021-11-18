const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');


const sendEmail = async options => {
    const transporter =nodemailer.createTransport(smtpTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        // pool: true,
        auth:{
            user: process.env.SMTP_EMAIL,
            pass:  process.env.SMTP_PASSWORD  
        },
        tls:{
            rejectUnauthorized: false
        }
    })
    )

    const message = {
        // from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }


    await transporter.sendMail(message);
}

module.exports = sendEmail;