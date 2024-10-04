import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './DTO/updateUser.dto';
import { User } from 'src/schemas/User.schemas';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    getUserById(id: string) {
        return this.userModel.findById(id).populate('rooms');
    }

    getAllUsers() {
        return this.userModel.find().populate('homes');
    }
    deleteUser(id: string) {
        return this.userModel.findByIdAndDelete(id);
    }

    updateUser(id: string, updateUserDto: UpdateUserDto) {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, {
            new: true,
        });
    }
}
