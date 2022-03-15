import { PartialType } from '@nestjs/mapped-types';
import { IsString, Length } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  name?: string;

  @IsString()
  nickname?: string;

  @IsString()
  password?: string;

  @IsString()
  @Length(11, 11)
  phone?: string;
}
