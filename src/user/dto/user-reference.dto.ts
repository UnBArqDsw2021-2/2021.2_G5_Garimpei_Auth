import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UserReferenceDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nickname?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  id?: number;
}
