import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetChatDto } from './dto/get-chat.dto';
import { Chat, ChatDocument } from 'src/schemas/chat.schemas';

@Injectable()
export class ChatsService {

  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
  ) {}
  
  async create(senderId: string, createChatDto: CreateChatDto) {
    console.log(createChatDto );
  
    
    console.log("Create chat services" );
    const createdChat = new this.chatModel({
      message: createChatDto.message,
      room_id: createChatDto.room_id,
      sender_id: senderId
    });
    try {
      console.log("Success");
      return await createdChat.save();
      
      
    } catch (err) {
      console.error('Error while saving the chat', );
    }
  }

  async findAll(roomId: string, getChatDto: GetChatDto) {
    const query = {
      room_id: roomId,
    };

    if (getChatDto.last_id) {
      query['_id'] = { $lt: getChatDto.last_id };
    }

    return this.chatModel.find(query).sort({ createdAt: -1 }).limit(getChatDto.limit);
  }
}
