import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from 'src/schemas/chat.schemas';
import { ChatsGateway } from './chat.gateway';
import { ChatsService } from './chats.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    ],
    providers: [ChatsService],
    exports: [ChatsService],
})
export class ChatsModule {}
