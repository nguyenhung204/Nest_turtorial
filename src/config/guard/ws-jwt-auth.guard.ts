import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class WsJwtAuthGuard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext) {
        const ctx = context.switchToWs();
        console.log("WS jwt");
        return ctx.getClient().handshake;
    }
}