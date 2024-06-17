import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy} from "passport-google-oauth20";
import { AuthService } from "../auth.service";
import { ConfigService } from '@nestjs/config';
import { UtilsService } from "src/utils/utils.service";


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor( 
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
     public configService: ConfigService,
     public utilservice: UtilsService
    ) {
   
    super({
      
      clientID: configService.get<string>('GOOGLE_CLIENT_ID') ,
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: `http://${utilservice.getServerIp()}:5000/auth/google/redirect`,
      scope: ['email' , 'profile' ],
      prompt: 'consent'
    });
    
  }

  async validate (accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
    const { name, emails, photos } = profile
    console.log(profile, accessToken, refreshToken);
    const user = await this.authService.validateUserGoogle({
      email: emails[0].value,
      username: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
      displayName : name.givenName + ' ' + name.familyName,
      accessToken : accessToken
    });
    console.log("Validate Google")
    console.log(user);
    return user || null;
  }

}