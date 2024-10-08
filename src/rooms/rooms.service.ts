import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from 'src/schemas/room.schemas';

@Injectable()
export class RoomsService {
    constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

    async create(userId: string, createRoomDto: CreateRoomDto) {
        createRoomDto.members.push(userId);
        const createdRoom = new this.roomModel(createRoomDto);
        return await createdRoom.save();
    }
    async getByRequest(userId: string) {
        return await this.roomModel.find({ members: userId }).exec();
    }
}
