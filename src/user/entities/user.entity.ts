import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column({ length: 11 })
  phone: string;

  @Column({ unique: true })
  email: string;
}
