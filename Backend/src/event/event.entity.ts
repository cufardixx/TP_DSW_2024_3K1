import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, ManyToOne, ManyToMany, JoinColumn } from "typeorm"
import { Ticket } from "../ticket/ticket.entity";
import { User } from "../user/user.entity";

@Entity()
export class Event extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    cupo: number;

    @Column({ type: 'date' })
    fecha: Date;

    @Column({ type: "time" })
    hora: string;

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

}