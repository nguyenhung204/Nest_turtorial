import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateHomeDto {
    @IsOptional()
    @IsString()
    name: string;
    state: string;
    city: string;

    @IsOptional()
    @IsBoolean()
    wifi: boolean;
    laundry: boolean;
    @IsOptional()
    availableUnits: number;
    @IsOptional()
    photo: string;
}