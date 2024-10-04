import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    password: string;
    @IsString()
    email: string;
    @IsOptional()
    username?: string;
    @IsOptional()
    refreshToken?: string;
}
