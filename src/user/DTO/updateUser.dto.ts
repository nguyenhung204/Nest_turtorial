import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    username: string;
    displayName: string;
    avatarUrl: string;
    password : string;
    email : string;
    settings: string;
    homes: string[];
}