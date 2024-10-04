import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.servive';
import { MongooseModule } from '@nestjs/mongoose';
import { Home, HomeSchema } from 'src/schemas/Home.schema';
import { User, UserSchema } from 'src/schemas/User.schemas';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Home.name,
                schema: HomeSchema,
            },
            {
                name: User.name,
                schema: UserSchema,
            },
        ]),
    ],
    controllers: [HomeController],
    providers: [HomeService],
})
export class HomeModule {}
