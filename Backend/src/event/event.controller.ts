import { Event } from "./event.entity"
import { Request, Response } from "express"



export const createEvent = async (req: Request, res: Response) => {
    try {
        const { name, cupo, fecha, description, hora, price } = req.body;
        //  ID del usuario está disponible en req.user.id
        const userId = (req as any).user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        const event = new Event();
        event.price = price;
        event.name = name;
        event.cupo = cupo;
        event.fecha = fecha;
        event.hora = hora;
        event.description = description;
        event.usuario = userId; // Asignar el ID del usuario al evento

        await event.save();
        return res.status(201).json({ message: 'Evento creado con éxito', event });
    } catch (error: any) {
        return res.status(500).json({ message: error.message || 'Error interno del servidor' });
    }
};


export const getEvents = async (req: Request, res: Response) => {
    try {
        const events = await Event.find()
        return res.status(200).json(events)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}


export const getEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const event = await Event.findOneBy({ id: parseInt(id) });

        if (!event) return res.status(404).json({ message: "event not found" });

        return res.json(event);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};



export const getEventByName = async (req: Request, res: Response) => {
    const { search } = req.query;
    try {
        if (search !== undefined) {
            const events = await Event.createQueryBuilder("event")
                .where("event.name ILIKE :search", { search: `%${search}%` })
                .getMany();

            if (events.length === 0) {
                return res.status(404).json({ message: "No se encontraron eventos" });
            }

            return res.json(events);
        } else {
            return res.status(400).json({ message: "Se requiere un parámetro de búsqueda" });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const delateEvent = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await Event.delete({ id: parseInt(id) });

        if (result.affected === 0)
            return res.status(404).json({ message: "User not found" });

        return res.sendStatus(204);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

