import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FacebookAuthGuard extends AuthGuard('facebook') {
    async canActivate(context: ExecutionContext) {
        const activate = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        console.log('Inside google guard');
        return activate;
    }

    handleRequest(err: any, user: any) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}
