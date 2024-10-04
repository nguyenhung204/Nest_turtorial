/* eslint-disable @typescript-eslint/no-require-imports */
import { Module } from '@nestjs/common';
import { HomeModule } from './home/home.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UtilsService } from './utils/utils.service';
import { ChatsGateway } from './chat/chat.gateway';
import { RoomsModule } from './rooms/rooms.module';
import { ChatsModule } from './chat/chat.module';
import { CommandModule } from 'nestjs-command';


@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URI'),
                connectionFactory: (connection) => {
                    connection.plugin(require('mongoose-autopopulate'));
                    return connection;
                },
            }),
            inject: [ConfigService],
        }),

        CommandModule,
        HomeModule,
        UserModule,
        AuthModule,
        RoomsModule,
        ChatsModule,
        ConfigModule.forRoot({ isGlobal: true }),
    ],
    providers: [UtilsService, ChatsGateway],
})
export class AppModule {}
