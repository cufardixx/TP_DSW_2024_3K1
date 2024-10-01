import nodemailer from 'nodemailer'


const trasporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
        user: "facundopicia@gmail.com",
        pass: "fancilywwrkiksix",
    },
});

// Función para enviar el correo
const enviarCorreoConQR = async (destinatario: string, qrCodes: string[]): Promise<void> => {
    try {
        const mailOptions = {
            from: 'facundopicia@hotmail.com',
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