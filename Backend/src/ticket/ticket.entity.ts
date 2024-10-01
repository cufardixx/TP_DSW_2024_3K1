import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Event } from '../event/event.entity';
import { User } from '../user/user.entity';

@Entity()
export class Ticket extends BaseEntity{
  
    @PrimaryGeneratedColumn()
    id: number;


    @Column({ unique: true })
    codigo_unico: string;

    @ManyToOne(() => Event, event => event.tickets)
    @JoinColumn({ name: "event_Id" })
    event: Event;

    @ManyToOne(() => User, user => user.tickets)
    @JoinColumn({ name: "user_Id" })
    user: User;

    @Column()
    eventId: number;

    @Column()
    userId: number;


}