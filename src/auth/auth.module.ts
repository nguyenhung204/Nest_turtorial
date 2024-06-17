import { Module, Session } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { jwtConstants } from './constants';
import { LocalGuard } from './guards/local.guards';
import { RefreshJwtStrategy } from './strategies/jwtRefresh.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { SessionSerializer } from './session.serializer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { UtilsService } from 'src/utils/utils.service';
import { User, UserSchema } from 'src/schemas/User.schemas';


@Module({
  imports: [
    MongooseModule.forFeature([

      {
        name: User.name,
        schema: UserSchema,
      },

    ],
    ),
    PassportModule.register({ session: true }),
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' }
    }),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UtilsService, GoogleStrategy,FacebookStrategy, LocalStrategy, JwtStrategy, LocalGuard, RefreshJwtStrategy,SessionSerializer, ConfigService,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    }
  ],
})
export class AuthModule { }