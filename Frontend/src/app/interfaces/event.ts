export interface Evento {
    id?: number;
    title: string;
    description: string;
    date: Date;
    location: string;
    organizer: string;
    capacity: number;
    price: number;
    category: string;
    image?: string;  
}

