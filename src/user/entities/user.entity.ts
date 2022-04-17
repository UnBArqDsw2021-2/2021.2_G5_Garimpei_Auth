import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { Community } from 'src/community/entities/community.entity';
import { InternalServerErrorException } from '@nestjs/common';

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
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      try {
        this.password = hashSync(this.password, 10);
      } catch (e) {
        throw new InternalServerErrorException(
          `There's something wrong with hash lib`,
        );
      }
    }
  }

  @ManyToOne(() => Community)
  @JoinColumn()
  community: Community;
}
