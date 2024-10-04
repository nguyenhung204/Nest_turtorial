import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateHomeDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsString()
    state: string;
    @IsNotEmpty()
    @IsString()
    city?: string;
    @IsBoolean()
    wifi?: boolean;
    laundry?: boolean;

    @IsString()
    @IsNotEmpty()
    userId: string;
}
