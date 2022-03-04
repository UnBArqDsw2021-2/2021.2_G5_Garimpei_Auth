import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  name?: string;
  nickname?: string;
  password?: string;
  phone?: string;
}
