import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateCommunityDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsPhoneNumber('BR')
  @IsOptional()
  phone: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  cep: string;

  @IsOptional()
  @IsNumber()
  latitude: number;

  @IsOptional()
  @IsUrl()
  banner: string;

  @IsOptional()
  @IsUrl()
  photo: string;
}
