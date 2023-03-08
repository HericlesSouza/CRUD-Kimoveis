import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RealEstate } from "./real.estate.entity";
import { User } from "./users.entity";

@Entity("schedules_users_properties")
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "date" })
    date: string;

    @Column({ type: "time" })
    hour: string;

    @ManyToOne(() => RealEstate, realEstate => realEstate.schedule)
    @JoinColumn()
    realEstate: RealEstate;

    @ManyToOne(() => User, user => user.schedule)
    @JoinColumn()
    user: User;
}