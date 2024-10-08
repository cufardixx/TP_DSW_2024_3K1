import nodemailer from 'nodemailer'
import dotenv from "dotenv";
dotenv.config()


const trasporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST!,
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
});

// Función para enviar el correo
const enviarCorreoConQR = async (destinatario: string, qrCodes: string[]): Promise<void> => {
    try {
        const mailOptions = {
            from: process.env.MAIL_FROM!,
            to: destinatario,
            subject: 'Tus tickets con QR',
            text: 'Gracias por tu compra. Aquí tienes tus tickets.',
            attachments: qrCodes.map((qrCode, index) => ({
                filename: `ticket_${index + 1}.png`,
                content: qrCode.split("base64,")[1],
                encoding: 'base64'
            }))
        };

        // Enviar el correo
        const info = await trasporter.sendMail(mailOptions);
        console.log('Correo enviado: ' + info.response);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};

export default enviarCorreoConQR; // Exportación por defecto