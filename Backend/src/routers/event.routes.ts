import { Router } from "express"
import { getEvent, getEvents, createEvent, delateEvent, getEventByName } from "../event/event.controller"
import { createEventSchema } from "../schemas/schema.event"
import { schemaValidation } from "../middlewares/schemaValidacion"
import { checkAuthToken } from "../middlewares/authToken"
import { checkRoleAuth } from "../middlewares/checkRole"


const router = Router()


router.post("/new", checkAuthToken, checkRoleAuth(["user"]),schemaValidation(createEventSchema), createEvent)
router.get("/", getEvents)
router.get("/search", getEventByName)
router.get("/:id", getEvent)
router.delete("/:id", delateEvent)




export default router