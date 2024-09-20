import { Request, Response } from "express";
import { Ticket } from "./ticket.entity";
import { CustomRequest } from "../middlewares/authToken";
import { User } from "../user/user.entity";
import { randomUUID } from "crypto";


export const createTicket = async (req: CustomRequest, res: Response) => {
  try {
    const { eventID } = req.body;
    const codigoQR = randomUUID()

    const user = await User.findOneBy({ id: req.user!.id });
    if (!user) return res.status(404).json({ message: "User not found" });

  
    const ticket = new Ticket()
    
    
    //ticket.usuario = user;
    //ticket.evento= eventID;
    ticket.codigo_unico= codigoQR
  

    await ticket.save();
    console.log(ticket);

    return res.status(201).json({ message: 'Ticket created successfully' });

  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
};
