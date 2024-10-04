import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from 'src/schemas/room.schemas';
import { ChatsModule } from 'src/chat/chat.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
        ChatsModule,
    ],
    controllers: [RoomsController],
    providers: [RoomsService],
})
export class RoomsModule {}
