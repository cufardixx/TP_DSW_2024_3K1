import { Repository } from "../shared/repository.js";
import { evento } from "./event.entity.js";

const eventos = [
    new evento (
        "a02f91bc-3769-4221-beb1-d7a3aeba7ads",
        'Fiesta de año nuevo',
        3000,
        '¡Celebra el Año Nuevo con nosotros! Disfruta de música, comida y un brindis a la medianoche. ¡Vení y dá la bienvenida al 2024 con estilo!',
        '31/12/2024',
        20,
    ),
]

export class EventoRepository implements Repository<evento>{
    public async findAll(): Promise<evento[] | undefined> {
        return await eventos
    }

    public async findOne (item: { id: string; }): Promise<evento | undefined> {
        return await eventos.find((evento)=> evento.idEvento === item.id)
    }

    public async add(item: evento): Promise<evento | undefined> {
        await eventos.push(item)
        return item
    }

    public async update(item: evento): Promise<evento | undefined> {
        const eventoIDx = await eventos.findIndex((evento) => evento.idEvento === item.idEvento)
        if(eventoIDx !== -1){
            eventos[eventoIDx] = { ...eventos[eventoIDx], ...item }
        }
        return eventos[eventoIDx] 
    }

    public async delete (item: { id: string; }): Promise<evento | undefined> {
        const eventoIDx = await eventos.findIndex((evento) => evento.idEvento === item.id)

        if(eventoIDx !== -1) {
            const deletedEventos = eventos[eventoIDx]
            eventos.splice(eventoIDx, 1)
            return deletedEventos
        }

    }
}