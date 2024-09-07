import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Event } from '../event/event.entity';
import { User } from '../user/user.entity';

@Entity()
export class Ticket extends BaseEntity{
  
    @PrimaryGeneratedColumn()
    id: number;


    @Column({ unique: true })
    codigo_unico: string;

    @ManyToOne(() => User, usuario => usuario.tickets)
    usuario: User;
  
    @ManyToOne(() => Event, evento => evento.tickets)
    evento: Event;
}