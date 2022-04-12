import { PartialType } from '@nestjs/mapped-types';
import { IsString, Length, Matches } from 'class-validator';
import { MessageHelper } from 'src/helpers/messages.helper';
import { RegexHelper } from 'src/helpers/regex.helper';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  name?: string;

  @IsString()
  nickname?: string;

  @IsString()
  @Matches(RegexHelper.password, { message: MessageHelper.PASSWORD_VALID })
  password?: string;

  @IsString()
  @Length(11, 11)
  phone?: string;
}
