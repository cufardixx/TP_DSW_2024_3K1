import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, ManyToOne, ManyToMany, JoinColumn } from "typeorm"
import { Ticket } from "../ticket/ticket.entity";
import { User } from "../user/user.entity";

@Entity()
export class Event extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    location: string;

    @Column()
    organizer: string;

    @Column({
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fes%2Fsearch%2Fevento%2Bnocturno&psig=AOvVaw1_855_855&ust=1721633000963000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPCF54uQ1IYDFQAAAAAdAAAAABAE"
    })
    image: string

    @Column()
    capacity: number;

    @Column({ type: 'date' })
    date: Date;

    @Column({ type: "time" })
    time: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @Column({
        default: true
    })
    active: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAd: Date;
    
    @ManyToOne(() => User, usuario => usuario.eventos)
    @JoinColumn({name: "user_id"})
    usuario: User;

    @Column()
    user_id: number;

    @Column({
        default: false
    })
    destacado: boolean;

    @OneToMany(() => Ticket, ticket => ticket.event)
    tickets: Ticket[];


    //category como una clase? evento nocturno, evento musical, evento deportivo, cumpleaños, etc

}