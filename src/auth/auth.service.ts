import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/DTO/user.dto';
import { AuthPayloadDto } from './DTO/auth.dto';
import { jwtConstants } from './constants';
import { AuthSocialDto } from './DTO/authSocial.dto';
import { User } from 'src/schemas/User.schemas';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
    ) {}

    async register(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        console.log(savedUser);

        const refreshToken = this.jwtService.sign({
            userName: savedUser.username,
            _id: savedUser._id,
        });
        return { savedUser, refreshToken };
    }

    async validateUser({ username, password }: AuthPayloadDto): Promise<any> {
        const user = await this.userModel.findOne({ username: username });
        if (!user) {
            throw new HttpException('User not found', 404);
        }
        if (await bcrypt.compare(password, user.password)) {
            console.log(password, user.password);
            const payLoad = { username: user.username, _id: user._id };
            console.log(payLoad);
            return {
                access_token: this.jwtService.sign(payLoad),
                refresh_token: this.jwtService.sign(payLoad, {
                    secret: jwtConstants.secret,
                    expiresIn: '1h',
                }),
            };
        } else {
            throw new HttpException('Invalid credentials', 401);
        }
    }

    async refreshToken(user: any) {
        const payLoad = { userName: user.username, _id: user._id };
        return {
            access_token: this.jwtService.sign(payLoad),
        };
    }

    async logout(_id: User) {
        return this.userModel.updateOne(_id, { refreshToken: null });
    }

    handleRedirect(req: any) {
        if (!req.user) {
            return 'No user from google';
        }

        return {
            message: 'User information from google',
            user: req.user,
        };
    }
    async validateUserGoogle(userGoogle: AuthSocialDto) {
        console.log(userGoogle);
        console.log('Inside Google Auth service');
        const user = await this.userModel.findOne({ email: userGoogle.email });
        console.log(user || 'User not found');
        if (user) return user;
        console.log('User not found! Creating new user...');
        const newUser = await this.userModel.create(userGoogle);
        return newUser.save();
    }

    async findUser(_id: string) {
        const user = this.userModel.findById({ _id });
        return user;
    }

    async validateUserFacebook(userFacebook: AuthSocialDto) {
        console.log(userFacebook);
        console.log('Inside Facebook Auth service');
        const user = await this.userModel.findOne({
            email: userFacebook.email,
        });
        console.log(user || 'User not found');
        if (user) return user;
        console.log('User not found! Creating new user...');
        const newUser = await this.userModel.create(userFacebook);
        return newUser.save();
    }
}
