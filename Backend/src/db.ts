import { DataSource } from "typeorm"
import { User } from "./user/user.entity"
import { Event } from "./event/event.entity"
import { Ticket } from "./ticket/ticket.entity"
import dotenv from "dotenv";

dotenv.config();

const AppDataSource = new DataSource({
    type: "mysql",
    host: "bjcsiaqrnj9kzodturom-mysql.services.clever-cloud.com",
    port: 3306,
    username: "uo0w75mbltyxiuiy",
    password: "Ch69yJ3t3ssRSDfbd8vh",
    database: "bjcsiaqrnj9kzodturom",
    synchronize: true,
    logging: false,
    entities: [User, Event, Ticket],
  });

  export default AppDataSource;

