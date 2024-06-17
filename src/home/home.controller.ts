import mongoose from 'mongoose';
import { HomeService } from './home.servive';
import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateHomeDto } from './DTO/home.dto';
import { UpdateHomeDto } from './DTO/updateHome.dto';

@Controller('home')
export class HomeController {
    constructor(private readonly homeService: HomeService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    createHome(@Body() createHomeDto: CreateHomeDto) {

        try {
            console.log(createHomeDto);
            return this.homeService.createHome(createHomeDto);
        }
        catch (error) {
            return error;
        }
    }

    @Get()
    getHomes() {
        return this.homeService.getHomes();
    }

    @Get(':id')
    async getHomeById(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Home not found', 404);
        const findHomes = this.homeService.getHomeById(id);
        if (!findHomes) throw new HttpException('Home not found', 404);
        return findHomes;
    }
    @Patch(':id')
    @UsePipes(new ValidationPipe())
    async updateHome(@Param('id') id: string, @Body() updateHomeDto: UpdateHomeDto) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Invalid ID', 400);
        const updatedHome = await this.homeService.updateHome(id, updateHomeDto);
        if (!updatedHome) throw new HttpException('Home not found', 404);
        return updatedHome;
    }

    @Delete(':id')
    async deleteHome(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Invalid ID', 400);
        const deletedHome = await this.homeService.deleteHome(id);
        if (!deletedHome) throw new HttpException('Home not found', 404);
        return deletedHome;
    }

}