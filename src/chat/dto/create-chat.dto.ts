import { IsNotEmpty } from 'class-validator';

export class CreateChatDto {
    @IsNotEmpty()
    readonly room_id: string;
    @IsNotEmpty()
    readonly message: string;
}
