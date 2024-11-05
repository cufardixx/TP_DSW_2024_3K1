import { Request, Response } from "express";
import { Ticket } from "./ticket.entity";
import { CustomRequest } from "../middlewares/authToken";
import { User } from "../user/user.entity";
import { randomUUID } from "crypto";
import { Event } from "../event/event.entity";
import QRCode from "qrcode";
import enviarCorreoConQR from "../lib/mailer";
import  AppDataSource  from "../db"; // Asegúrate de importar tu AppDataSource correctamente

async function generarQR(texto: string): Promise<string> {
    try {
        return await QRCode.toDataURL(texto);
    } catch (err) {
        throw new Error('No se pudo generar el QR');
    }
}

export const createTicket = async (req: CustomRequest, res: Response) => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const { cantidad } = req.body;
        const { id: eventID } = req.params;

        
        const [user, event] = await Promise.all([
            queryRunner.manager.findOne(User, { where: { id: req.user!.id } }),
            queryRunner.manager.findOne(Event, { where: { id: parseInt(eventID) } })
        ]);

        if (!event) return res.status(404).json({ message: "Evento no encontrado" });
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        // capacidad disponible?
        const ticketsVendidos = await queryRunner.manager.count(Ticket, { where: { eventId: event.id } });
        const capacidadDisponible = event.capacity - ticketsVendidos;

        if (capacidadDisponible < cantidad) {
            return res.status(400).json({ message: `No hay suficientes boletos disponibles. Quedan ${capacidadDisponible} boletos.` });
        }

        // Restar la cantidad de boletos comprados de la capacidad
        event.capacity -= cantidad;
        await queryRunner.manager.save(event);

        // Crear múltiples tickets con código QR
        const tickets = await Promise.all(
            Array.from({ length: cantidad }, async () => {
                const qrCode = await generarQR(randomUUID());
                return queryRunner.manager.create(Ticket, {
                    event,
                    user,
                    eventId: event.id, 
                    userId: user.id, 
                    codigo_unico: randomUUID(),
                    qrCode
                });
            })
        );

        // Guardar todos los tickets en la base de datos
        await queryRunner.manager.save(Ticket, tickets);

        // Enviar correo con los QR generados
        if (user.email) {
            await enviarCorreoConQR(user.email, tickets.map(ticket => ticket.qrCode!));
            console.log('Correo enviado exitosamente');
        } else {
            console.log('No se pudo enviar el correo: email de usuario no definido');
        }

        // Confirmar transacción
        await queryRunner.commitTransaction();

        return res.status(201).json({ message: `${cantidad} ticket(s) creado(s) exitosamente` });

    } catch (error: any) {
        await queryRunner.rollbackTransaction();
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    } finally {
        await queryRunner.release();
    }
};


