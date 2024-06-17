import { JwtUtil } from '../util/jwt.util';

export function wsAuthMiddleware(socket : any, next : any) {
    try {
        const { authorization } = socket.handshake.headers;
        JwtUtil.isValidAuthHeader(authorization);
        console.log("WS Auth Middleware");
        return next();
    } catch (error) {
        socket.emit("error", error);
        return next(error);
    }
}
