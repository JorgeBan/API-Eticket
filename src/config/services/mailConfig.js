const nodemailer = require("nodemailer");

const mail = {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
}

let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    tls: {
        rejectUnauthorized: false
    },
    secure: false,
    auth: {
        user: mail.user,
        pass: mail.pass,
    },
});

function sendMail(email, subject, html) {
    try {
        transporter.sendMail({
            from: 'admtest.dev@gmail.com',
            to: email,
            subject,
            text: "Confirmar cuenta",
            html,
        })
        console.log("Email sent");
    } catch (err) {
        console.log("ha ocurrido un error: ", err)
    }
}

function getTemplate(name, token) {
    let url = process.env.URL_DEV + "";
    console.log("entro a getTemplate",);
    console.log("Entro al template: ", url + "/api/auth/confirm/${token}")
    return `
    <div id="email___content">
        <img src="https://mtracks.azureedge.net/public/images/site/Verify-Email-illo.png" alt="">
        <h2>Hola ${name}</h2>
        <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
        <a
            href="${url}/api/v1.0.0/auth/confirm/${token}"
            target="_blank"
        >Confirmar Cuenta</a>
    </div>
  `;
}

module.exports = {
    sendMail,
    getTemplate
}