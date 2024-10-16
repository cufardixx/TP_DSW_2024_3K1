import { Router } from "express"
import {createTicket, getTicketsByUser} from  '../ticket/ticket.controller'
import { checkAuthToken } from "../middlewares/authToken"
import { checkRoleAuth } from "../middlewares/checkRole"




const router = Router()

//ruta protegida 
router.post("/buy/:id",checkAuthToken, checkRoleAuth(["user", "admin"]), createTicket)

export default router