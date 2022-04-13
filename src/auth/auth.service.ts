import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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

  async resetPassword(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne(id);

      if (!user) {
        throw new NotFoundException(`User not found with id ${id}`);
      }
      await this.userRepository.save(Object.assign(user, updateUserDto));
    } catch (error) {
      throw new BadRequestException('Invalid operation');
    }
    return await this.userRepository.findOne(id);
  }
}
