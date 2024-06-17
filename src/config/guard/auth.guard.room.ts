import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RoomAuth extends AuthGuard('jwt') { 

    handleRequest(err, user, info: Error) {
        if (err || !user) {
            console.log("heeheh");
            throw err || new Error(info.message);
        }
        return user;
    }

}