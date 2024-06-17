import {IsNotEmpty, IsString } from "class-validator";

export class AuthSocialDto {
    @IsString()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    username: string;
    @IsString()
    @IsNotEmpty()
    picture: string;
    @IsString()
    @IsNotEmpty()
    displayName : string;
    @IsString()
    @IsNotEmpty()
    accessToken : string;

}