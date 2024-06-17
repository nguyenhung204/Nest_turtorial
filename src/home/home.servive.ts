import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHomeDto } from 'src/home/DTO/home.dto';
import { Home } from 'src/schemas/Home.schema';
import { UpdateHomeDto } from './DTO/updateHome.dto';
import { User } from 'src/schemas/User.schemas';



@Injectable()

export class HomeService {

    constructor(
        @InjectModel(Home.name) private homeModel: Model<Home>,
        @InjectModel(User.name) private userModel: Model<User>) { }

    async createHome({ userId, ...createHomeDto }: CreateHomeDto) {
        const findUser = await this.userModel.findById(userId);
        if (!findUser) {
            console.log(userId);
            throw new HttpException('User not found', 404);
        }
        const newHome = new this.homeModel(createHomeDto);
        const savedHome = await newHome.save();
        await findUser.updateOne({ 
            $push: { 
                homes: savedHome._id,
         } });
        return savedHome;
    }
    getHomes() {
        return this.homeModel.find();
    }
    getHomeById(id: string) {
        return this.homeModel.findById(id);
    }
    updateHome(id: String, updateHomeDto: UpdateHomeDto) {
        return this.homeModel.findByIdAndUpdate(id, updateHomeDto, { new: true });

    }
    deleteHome(id: String) {
        return this.homeModel.findByIdAndDelete(id);
    }
}






