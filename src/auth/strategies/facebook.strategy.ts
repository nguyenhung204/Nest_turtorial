import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { AuthService } from '../auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService,
        private configService: ConfigService,
    ) {
        super({
            clientID: configService.get<string>('APP_ID'),
            clientSecret: configService.get<string>('APP_SECRET'),
            callbackURL: 'http://localhost:5000/auth/facebook/redirect',
            scope: ['email', 'public_profile'],
            profileFields: ['id', 'emails', 'name', 'photos'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
    ): Promise<any> {
        const { name, emails, photos } = profile;
        console.log(profile, accessToken, refreshToken);
        const user = await this.authService.validateUserFacebook({
            email: emails[0].value,
            username: name.givenName + ' ' + name.familyName,
            picture: photos[0].value,
            displayName: name.givenName + ' ' + name.familyName,
            accessToken: accessToken,
        });
        console.log('Validate Facebook');
        console.log(user);
        return user || null;
    }
}
