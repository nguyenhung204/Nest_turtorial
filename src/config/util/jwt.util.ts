import * as jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/auth/constants';

export class JwtUtil {
    static isValidAuthHeader(authorization: string) {
        const token: string = authorization.split(' ')[1];

        const payload = jwt.verify(token, jwtConstants.secret, {
            ignoreExpiration: false,
        });
        return payload;
    }
}
