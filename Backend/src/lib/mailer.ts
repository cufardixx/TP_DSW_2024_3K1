import nodemailer from 'nodemailer'
import dotenv from "dotenv";
dotenv.config()


const generarHtmlConQr = (qrImages: string[]): string => {
    const qrImagesHtml = qrImages.map(qrCode => `<img src="data:image/png;base64,${qrCode}" alt="QR Code" />`).join('');
    
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                background-color: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px #0084f0;
            }
            .header {
                background-color: #0084f0;
                color: white;
                padding: 10px;
                text-align: center;
                border-radius: 8px 8px 0 0;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .content p {
                font-size: 16px;
                color: #333;
            }
            .content h2 {
                color: #0084f0;
            }
            .qr-container {
                margin-top: 20px;
                text-align: center;
            }
            .qr-container img {
                border: 2px solid #0084f0;
                border-radius: 8px;
                padding: 10px;
            }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                text-align: center;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>¡Gracias por tu compra!</h1>
            </div>
            <div class="content">
                <h2>Aquí están tus tickets</h2>
                <p>Presenta este código QR en el evento para acceder.</p>
                <div class="qr-container">
                    ${qrImagesHtml}
                </div>
            </div>
            <div class="footer">
                <p>Si tienes alguna duda, contáctanos a través de nuestro servicio de atención al cliente.</p>
                <p>¡Te esperamos en el evento!</p>
            </div>
        </div>
    </body>
    </html>
    `;
  };  

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
        const htmlContent = generarHtmlConQr(qrCodes);
        const mailOptions = {
            from: process.env.MAIL_FROM!,
            to: destinatario,
            subject: 'Confirmación de compra',
            html: htmlContent,
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