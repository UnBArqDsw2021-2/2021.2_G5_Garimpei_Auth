import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    if (userExists) {
      throw new BadRequestException(`Email already in use`);
    }
    const user = await this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);

    return {
      id: savedUser.id,
      email: savedUser.email,
      nickname: savedUser.nickname,
    };
  }

  findAll() {
    console.log(this.userRepository);
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User not found with id ${id}`);
    }
    return user;
  }

  async findOneOrFail(
    conditions: FindConditions<User>,
    options?: FindOneOptions<User>,
  ) {
    try {
      return await this.userRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User not found with id ${id}`);
    }
    await this.userRepository.save(Object.assign(user, updateUserDto));
    return await this.userRepository.findOne(id);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User not found with id ${id}`);
    }
    await this.userRepository.delete(id);
    return { message: `User with id ${id} deleted with success` };
  }
}
