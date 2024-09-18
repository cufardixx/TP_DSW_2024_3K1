import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, Unique, OneToMany } from "typeorm"
import { Event } from '../event/event.entity';
import { Ticket } from "../ticket/ticket.entity";
@Entity()
@Unique(['email'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    phone: number;

    @Column()
    location: string;

    @Column({ type: 'date' })
    birth: Date;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        default: "user"
    })
    rol: string;

    @Column({
        default: true
    })
    active: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAd: Date;

    @OneToMany(() => Event, evento => evento.usuario)
    eventos: Event[];

    @OneToMany(() => Ticket, ticket => ticket.usuario)
    tickets: Ticket[];

}