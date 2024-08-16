import { Repository } from "../shared/repository.js";
import { Location } from "./location.entity.js";

const locations = [
    new Location(
        'dirtmouth',
        "Hallownest 459",
        "75",
        "¡Descubrí Dirtmouth, el destino para tus eventos más memorables! En este enigmático pueblo, cada rincón está cargado de historia y aventura. Sumate a la experiencia en un lugar donde la oscuridad se mezcla con la magia. ¡Tu próximo evento será legendario en Dirtmouth!",
        'a02b91bc-3754-4221-beb1-d7a3aeba7dad'
    ),
]

export class LocationRepository implements Repository<Location> {

    public async findAll(): Promise<Location[] | undefined> {
        return await locations
    }

    public async findOne(item: { id: string; }): Promise<Location | undefined> {
        return await locations.find((location) => location.id === item.id)
    }

    public async add(item: Location): Promise<Location | undefined> {
        await locations.push(item)
        return item
    }

    public async update(item: Location): Promise<Location | undefined> {
        const locationIdx = await locations.findIndex((location) => location.id === item.id)
    
        if(locationIdx !== -1){
            locations[locationIdx] = {...locations[locationIdx], ...item}
        }
        return locations[locationIdx]
    }

    public async delete(item: { id: string; }): Promise<Location | undefined> {
        const locationIdx = await locations.findIndex((location) => location.id === item.id)

        if(locationIdx !== -1){
            const deletedLocations = locations[locationIdx]
            locations.splice(locationIdx, 1)
            return deletedLocations
        }

    }
}