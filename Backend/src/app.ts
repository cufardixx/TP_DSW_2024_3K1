import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoute from "./routers/user.routes"
import userEvent from "./routers/event.routes"
import userTicket from "./routers/ticket.routes"
import categoryRoute from "./routers/category.routes"

const app = express();

app.use(express.urlencoded({extended: false}))
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


app.use("/api/category", categoryRoute)
app.use("/api/user", userRoute)
app.use("/api/event", userEvent)
app.use("/api/ticket", userTicket)

export default app;