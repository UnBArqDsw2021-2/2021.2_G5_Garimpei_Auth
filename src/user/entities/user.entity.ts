import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hashSync } from 'bcrypt';

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

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
    console.log(this.password);
  }
}
