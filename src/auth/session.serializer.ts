import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { User } from 'src/schemas/User.schemas';


@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor
  (@Inject('AUTH_SERVICE') private readonly authService: AuthService)
  {
    super();
  }
  serializeUser(user:User, done : Function) {
    console.log("Serialize User");
    done(null, user);

  }

  async deserializeUser(payload: any,  done : Function){
    const user = this.authService.findUser(payload._id);
    console.log("Deserialize User");
    console.log(user);
    return user ?   done(null, user) : done(null, null);
  }
}
