import { evento } from "./evento.js";
const eventos = [
    new evento("123123", 'Fiesta de año nuevo', 3000, '¡Celebra el Año Nuevo con nosotros! Disfruta de música, comida y un brindis a la medianoche. ¡Vení y dá la bienvenida al 2024 con estilo!', '31/12/2024', 20),
];
export class EventoRepository {
    findAll() {
        return eventos;
    }
    findOne(item) {
        return eventos.find((evento) => evento.idEvento === item.id);
    }
    add(item) {
        eventos.push(item);
        return item;
    }
    update(item) {
        const eventoIDx = eventos.findIndex((evento) => evento.idEvento === item.idEvento);
        if (eventoIDx !== -1) {
            eventos[eventoIDx] = { ...eventos[eventoIDx], ...item };
        }
        return eventos[eventoIDx];
    }
    delete(item) {
        const eventoIDx = eventos.findIndex((evento) => evento.idEvento === item.id);
        if (eventoIDx !== -1) {
            const deletedEventos = eventos[eventoIDx];
            eventos.splice(eventoIDx, 1);
            return deletedEventos;
        }
    }
}
//# sourceMappingURL=repositorio.js.map