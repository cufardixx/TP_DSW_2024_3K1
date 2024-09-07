import { Router } from "express"
import {createTicket} from  '../ticket/ticket.controller'
import { checkAuthToken } from "../middlewares/authToken"
import { checkRoleAuth } from "../middlewares/checkRole"



const router = Router()

//ruta protegida 
router.post("/buy",checkAuthToken, checkRoleAuth(["user"]), createTicket)

export default router