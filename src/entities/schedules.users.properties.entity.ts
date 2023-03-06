import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne(() => RealEstate)
    realEstate: RealEstate;

    @ManyToOne(() => User)
    user: User;
}