import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { RealEstate } from "./real.estate.entity";

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 45, unique: true })
    name: string;

    @OneToMany(() => RealEstate, realEstate => realEstate.category)
    realEstate?: RealEstate[];
} 