import { Router } from "express"
import { getEvent, getEvents, createEvent, delateEvent } from "../event/event.controller"
import { createEventSchema } from "../schemas/schema.event"
import { schemaValidation } from "../middlewares/schemaValidacion"


const router = Router()


router.get("/", getEvents)
router.get("/:id", getEvent)
router.delete("/:id", delateEvent)
router.post("/new", schemaValidation(createEventSchema), createEvent)




export default router