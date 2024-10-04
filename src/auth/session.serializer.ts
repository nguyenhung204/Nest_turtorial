import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    ) {
        super();
    }
    serializeUser(user: any, done: (err: any, id?: any) => void): void {
        done(null, user);
    }
    
    deserializeUser(payload: any, done: (err: any, user?: any) => void): void {
        done(null, payload);
    }
}
