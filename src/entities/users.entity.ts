import { getRounds, hashSync } from "bcryptjs";
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("users")
class User {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "varchar", length: 45 })
    nome: string;

    @Column({ type: "varchar", unique: true })
    email: string;

    @Column({ type: "boolean", default: true })
    admin: boolean = false;

    @Column({ type: "varchar", length: 120 })
    password: string;

    @CreateDateColumn({ type: "date" })
    createdAt: string | Date;

    @UpdateDateColumn({ type: "date" })
    updatedAt: string | Date;

    @DeleteDateColumn({ type: "date", nullable: true })
    deletedAt?: string | Date | null | undefined;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        const isEncrypted: number = getRounds(this.password);
        if (!isEncrypted) {
            this.password = hashSync(this.password, 10);
        }
    }
}

export { User };
