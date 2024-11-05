import { Router } from "express"
import {createTicket, getTickets} from  '../ticket/ticket.controller'
import { checkAuthToken } from "../middlewares/authToken"
import { checkRoleAuth } from "../middlewares/checkRole"




const router = Router()

//ruta protegida 
router.post("/buy/:id",checkAuthToken, checkRoleAuth(["user", "admin"]), createTicket)
router.get("/:id", checkAuthToken, checkRoleAuth(["user", "admin"]), getTickets)

export default router