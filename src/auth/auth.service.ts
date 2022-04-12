import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { compareSync, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(user: User) {
    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    let user: User;
    try {
      user = await this.userService.findOneOrFail({ email });
    } catch (error) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) throw new BadRequestException('Invalid credentials');

    return user;
  }

  async validateToken(user: User) {
    const { email } = user;
    let userData: User;
    try {
      userData = await this.userService.findOneOrFail({ email });
    } catch (error) {
      throw new NotFoundException(`User not found with email ${email}`);
    }

    return userData;
  }

  async resetPassword(id: number, password: string) {
    let userData: User;
    try {
      userData = await this.userService.findOneOrFail({ id });
      const hashedPassword = hashSync(password, 10);
      console.log(hashedPassword);
      await this.userRepository.update({ id }, { password: hashedPassword });
    } catch (error) {
      throw new NotFoundException(`User not found with id ${id}`);
    }

    return userData;
  }
}
