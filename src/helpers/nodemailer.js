import nodemailer from "nodemailer";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

function sendEmail(newPassword, userEmail) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Recuperação de Senha',
        html: getEmailTemplate(newPassword)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log('Erro ao enviar e-mail: ', error);
        } else {
            console.log('E-mail enviado: ' + info.response);
        }
    });
}

const getEmailTemplate = (newPassword) => {
    const htmlTemplate = fs.readFileSync("./src/templates/changePassword.html", 'utf-8');
    return htmlTemplate.replace('{{newPassword}}', newPassword);
 };

 export {sendEmail};

