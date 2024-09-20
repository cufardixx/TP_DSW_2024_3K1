import { Router } from "express"
import { getEvent, getEvents, createEvent, delateEvent, getEventByName } from "../event/event.controller"
import { createEventSchema } from "../schemas/schema.event"
import { schemaValidation } from "../middlewares/schemaValidacion"


const router = Router()


router.post("/new", schemaValidation(createEventSchema), createEvent)
router.get("/", getEvents)
router.get("/search", getEventByName)
router.get("/:id", getEvent)
router.delete("/:id", delateEvent)




export default router