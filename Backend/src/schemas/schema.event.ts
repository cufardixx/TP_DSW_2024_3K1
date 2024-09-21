import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/;

export const createEventSchema = z.object({
    body: z.object({
        price: z.number().nonnegative(),
        title: z.string().min(1, "nombre necesaria"),
        description: z.string().min(1, "Descripcion necesaria"),
        date: z.string().refine(date => !isNaN(Date.parse(date)), "Fecha inválida"),
        time: z.string().regex(timeRegex, "Invalid time format"),
        capacity: z.number().positive().min(1, "debe ser 1 como minimo"),
    }),
    query: z.object({

        search: z.string().optional()
    })
})