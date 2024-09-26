import { Request, Response } from "express";
import { Ticket } from "./ticket.entity";
import { CustomRequest } from "../middlewares/authToken";
import { User } from "../user/user.entity";
import { randomUUID } from "crypto";
import { Event } from "../event/event.entity";

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
    const ticketsVendidos = await Ticket.sum('cantidad', {  eventId: event.id });
    const capacidadDisponible = event.capacity - (ticketsVendidos || 0);

    if (capacidadDisponible < cantidad) {
      return res.status(400).json({ message: `No hay suficientes boletos disponibles. Quedan ${capacidadDisponible} boletos.` });
    }

    // Crear múltiples tickets, cada uno con su propio código único
    const tickets = [];
    for (let i = 0; i < cantidad; i++) {
      const ticket = Ticket.create({
        cantidad: 1,
        event,
        user,
        codigo_unico: randomUUID(),
        eventId: event.id,
        userId: user.id
      });
      tickets.push(ticket);
    }

    // Guardar todos los tickets en la base de datos
    await Ticket.save(tickets);

    return res.status(201).json({ message: `${cantidad} ticket(s) creado(s) exitosamente` });

  } catch (error: any) {
    return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};
