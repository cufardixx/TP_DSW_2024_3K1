import { Time } from "@angular/common";

export interface Evento {
    id?: number;
    title: string;
    description: string;
    date: Date;
    location: string;
    organizer: string;
    capacity: number;
    price: number;
    image?: string;  
    time: string,
}

