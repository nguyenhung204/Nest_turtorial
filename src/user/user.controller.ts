import {
    Controller,
    Get,
    Put,
    Delete,
    Body,
    Param,
    HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import mongoose from 'mongoose';
import { UpdateUserDto } from './DTO/updateUser.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers() {
        return this.userService.getAllUsers().populate('rooms');
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('User not found', 404);
        const findUsers = await this.userService.getUserById(id);
        if (!findUsers) throw new HttpException('User not found', 404);
        return findUsers.populate('rooms');
    }

    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('User not found', 400);
        const updatedUser = await this.userService.updateUser(
            id,
            updateUserDto,
        );
        if (!updatedUser) throw new HttpException('User not found', 404);
        return updatedUser;
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('User not found', 400);
        const deletedUser = await this.userService.deleteUser(id);
        if (!deletedUser) throw new HttpException('User not found', 404);
        return deletedUser;
    }
}
