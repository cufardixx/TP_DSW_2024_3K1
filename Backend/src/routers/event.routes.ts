import { Router } from "express"
import { getEvent, createEvent, delateEvent, getEventByName, getEventsByUser } from "../event/event.controller"
import { createEventSchema } from "../schemas/schema.event"
import { schemaValidation } from "../middlewares/schemaValidacion"
import { checkAuthToken } from "../middlewares/authToken"
import { checkRoleAuth } from "../middlewares/checkRole"


const router = Router()


router.post("/new", checkAuthToken, checkRoleAuth(["user"]),schemaValidation(createEventSchema), createEvent)
router.get("/", checkAuthToken, checkRoleAuth(["user"]), getEventsByUser)
router.get("/search", getEventByName)
router.get("/:id", getEvent)
router.delete("/:id", delateEvent)




export default router