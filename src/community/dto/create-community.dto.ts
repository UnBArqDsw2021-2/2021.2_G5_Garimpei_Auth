import { IsEmail, IsInt, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUrl, Min } from "class-validator";

export class CreateCommunityDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsInt()
    @Min(0)
    adminId: number;

    @IsString()
    city: string;

    @IsPhoneNumber('BR')
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