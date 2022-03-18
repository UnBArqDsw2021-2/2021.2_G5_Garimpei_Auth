import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { MessageHelper } from 'src/helpers/messages.helper';
import { RegexHelper } from 'src/helpers/regex.helper';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  @Matches(RegexHelper.password, { message: MessageHelper.PASSWORD_VALID })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 11)
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
