
import { Module } from '@nestjs/common';
import { HomeModule } from './home/home.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UtilsService } from './utils/utils.service';
import { ChatsGateway } from './chat/chat.gateway';
import { RoomsModule } from './rooms/rooms.module';
import { ChatsModule } from './chat/chat.module';
import { InterestsModule } from './interests/interests.module';
import { CommandModule } from 'nestjs-command';



@Module({
  imports: [ MongooseModule.forRoot('mongodb://127.0.0.1:27017/backend'
    ,
    {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      },
    },
  ),
    CommandModule,
    HomeModule,
    InterestsModule,
    UserModule,
    AuthModule,
    RoomsModule,
    ChatsModule,
    ConfigModule.forRoot({isGlobal: true}),
  ],
  providers: [UtilsService, ChatsGateway],
})
export class AppModule {}
