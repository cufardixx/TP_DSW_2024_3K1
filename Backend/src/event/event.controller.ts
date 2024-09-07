import { Event } from "./event.entity"
import { Request, Response } from "express"



export const createEvent = async (req: Request, res: Response) => {
    try {
        const { name, cupo, fecha, description, hora, price } = req.body;

        const event = new Event();
        event.price = price;
        event.name = name;
        event.cupo = cupo;
        event.fecha = fecha;
        event.hora = hora;
        event.description = description;


        await event.save();
        return res.status(201).json({ message: 'Evento creado con éxito', event });
    } catch (error: any) {
        return res.status(500).json({ message: error.message || 'Internal server error' });
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