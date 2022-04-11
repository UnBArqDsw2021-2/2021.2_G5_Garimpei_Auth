import { Type } from "class-transformer";
import { IsEmail, IsInt, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUrl, Min, ValidateNested } from "class-validator";

class UserDto {
    @IsInt()
    @Min(1)
    id: number
}

export class CreateCommunityDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @ValidateNested()
    @Type(() => UserDto)
    admin: UserDto;

    @IsString()
    city: string;

    @IsPhoneNumber('BR')
    phone: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsString()
    cep?: string;

    @IsOptional()
    @IsNumber()
    latitude?: number;

    @IsOptional()
    @IsUrl()
    banner?: string;

    @IsOptional()
    @IsUrl()
    photo?: string;
}