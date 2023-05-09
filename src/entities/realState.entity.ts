import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Address } from "./addresses.entity";
import { Category } from "./categories.entity";
import { Schedule } from "./schedules.entity";

@Entity()
class RealEstate {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "boolean", default: true })
    sold: boolean = false;

    @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
    value: number | string;

    @Column({ type: "integer" })
    size: number;

    @CreateDateColumn({ type: "date" })
    createdAt: string | Date;

    @UpdateDateColumn({ type: "date" })
    updatedAt: string | Date;

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address;

    @ManyToOne(() => Category, (categories) => categories.realEstate)
    category: Category;

    @OneToMany(() => Schedule, (schedules) => schedules.realEstate)
    schedules: Schedule[];
}
export { RealEstate };
