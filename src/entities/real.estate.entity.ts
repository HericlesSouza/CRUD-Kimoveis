import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Address } from "./addresses.entity";
import { Category } from "./category.entity";

@Entity("real_estate")
export class RealEstate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    sold: boolean;

    @Column({ type: "decimal", precision: 12, scale: 2 })
    value: number | string;

    @Column({ type: "integer" })
    size: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address;

    @ManyToOne(() => Category)
    category: Category;
}