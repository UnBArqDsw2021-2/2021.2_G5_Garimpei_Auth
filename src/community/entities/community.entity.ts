import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entities/user.entity"

@Entity()
export class Community {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    phone: string;

    @Column()
    location: string;

    @Column()
    city: string;

    @Column()
    cep: string;

    @Column()
    latitude: number;

    @Column()
    email: string;

    @Column()
    banner: string;

    @Column()
    photo: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @OneToOne(() => User)
    @JoinColumn()
    admin: User
}