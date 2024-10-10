

export interface Evento {
    destacado: boolean;
    user_id: number;
    id?: number;
    title: string;
    description: string;
    date: Date;
    location: string;
    organizer: string;
    capacity: number;
    price: number;
    image: string;  
    time: string,
    categoryId?: number,
    categoria_name?: string
    category?: string
    
}

