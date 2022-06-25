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

async function sendTickets(listaTickets, datosCliente, subject, html) {
    try {
        let listaPdf = [];
        for (let i = 0; i < listaTickets.length; i++) {
            let attachment = {
                name: listaTickets[i].nombre,
                path: listaTickets[i].ruta,
                contentType: "application/pdf"
            }
            listaPdf.push(attachment);
        }
        let message = {
            from: 'admtest.dev@gmail.com',
            to: datosCliente.email,
            subject,
            text: "Estos son tus tickets, por favor verifica que esten correctos, si no, contacta con nosotros, gracias por tu compra",
            html,
            attachments: listaPdf
        }
        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log("ha ocurrido un error: ", err);
            }
            console.log("Email sent");
        });
        console.log("lista pdf", listaPdf);

    } catch (err) {
        console.log("Error en sendTickets: ", err)
    }
}

function getTemplatePDF(name) {
    return `
    <div id="email___content">
        <img src="https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f39f.png" alt="">
        <h2>Hola ${name} estos son tus tickets, gracias por la compra</h2>
    </div>
  `;
}

function getTemplate(name, token) {
    let url = process.env.URL_DEV + "" || process.env.URL_PRO + "";
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
    getTemplate,
    getTemplatePDF,
    sendTickets
}