import { DataSource } from "typeorm"
import { User } from "./user/user.entity"
import { Event } from "./event/event.entity"
import { Ticket } from "./ticket/ticket.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "typeormdb",
    entities: [User, Event, Ticket],
    logging: true,
    synchronize: true
})