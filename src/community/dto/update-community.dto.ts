import { IsNumber, IsString } from "class-validator";

export class UpdateCommunityDto {
    @IsString()
    name?: string;

    @IsString()
    description?: string;

    @IsString()
    phone?: string;

    @IsString()
    location?: string;

    @IsString()
    city?: string;

    @IsString()
    cep?: string;

    @IsNumber()
    latitude?: number;

    @IsString()
    email?: string;

    @IsString()
    banner?: string;

    @IsString()
    photo?: string;
}