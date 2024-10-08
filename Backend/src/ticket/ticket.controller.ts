import { Request, Response } from "express";
import { Ticket } from "./ticket.entity";
import { CustomRequest } from "../middlewares/authToken";
import { User } from "../user/user.entity";
import { randomUUID } from "crypto";
import { Event } from "../event/event.entity";
import QRCode from "qrcode";
import enviarCorreoConQR from "../lib/mailer";


async function generarQR(texto: string): Promise<string> {
    try {
        const qrCode = await QRCode.toDataURL(texto);
        return qrCode;
    } catch (err) {
        console.error('Error generando QR:', err);
        throw new Error('No se pudo generar el QR');
    }
}

export const createTicket = async (req: CustomRequest, res: Response) => {
    try {
        const { cantidad } = req.body;
        const { id: eventID } = req.params;

        // Buscar el evento y el usuario simultáneamente
        const [user, event] = await Promise.all([
            User.findOneBy({ id: req.user!.id }),
            Event.findOneBy({ id: parseInt(eventID) })
        ]);

        if (!event) return res.status(404).json({ message: "Evento no encontrado" });
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        // Verificar la capacidad disponible
        const ticketsVendidos = await Ticket.count({ where: { eventId: event.id } });
        const capacidadDisponible = event.capacity - ticketsVendidos;

        if (capacidadDisponible < cantidad) {
            return res.status(400).json({ message: `No hay suficientes boletos disponibles. Quedan ${capacidadDisponible} boletos.` });
        }



        // Crear múltiples tickets con código QR
        const tickets = await Promise.all(
            Array.from({ length: cantidad }, async () => {
                const qrCode = await generarQR(randomUUID());
                return Ticket.create({
                    event,
                    user,
                    codigo_unico: randomUUID(),
                    qrCode, // Guardar el QR generado
                    eventId: event.id,
                    userId: user.id
                });
            })
        );

        // Guardar todos los tickets en la base de datos
        await Ticket.save(tickets);

        if (user?.email) {
            await enviarCorreoConQR(user.email, tickets.map(ticket => ticket.qrCode!));
            console.log('Correo enviado exitosamente');
        } else {
            console.log('No se pudo enviar el correo: email de usuario no definido');
        }

        return res.status(201).json({ message: `${cantidad} ticket(s) creado(s) exitosamente` });

    } catch (error: any) {
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};


