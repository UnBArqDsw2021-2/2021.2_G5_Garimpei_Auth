import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { hashSync } from 'bcrypt';
import { Community } from 'src/community/entities/community.entity';

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

  @ManyToOne(() => Community)
  @JoinColumn()
  community: Community
}
