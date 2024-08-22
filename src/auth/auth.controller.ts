import { AuthService } from './auth.service';
import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { LocalGuard } from "./guards/local.guards";
import { JwtAuthGuard } from "./guards/jwt.guards";
import { CreateUserDto } from 'src/user/DTO/user.dto';
import { Request } from 'express';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshJwtAuthGuard } from './guards/refresh.guards';
import { GoogleAuthGuard } from './guards/google.guards';
import { FacebookAuthGuard } from './guards/facebook.guards';
import { User } from 'src/schemas/User.schemas';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  //register
  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }
  //login 
  @UseGuards(LocalGuard)
  @Post('login')
  @UseGuards(LocalStrategy)
  login(@Req() req: Request) {
    return req.user;
  }
  //refresh token
  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  async refresh(@Req() req: Request) {
    return this.authService.refreshToken(req.user as User);
  }
  //logout
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }

  //decode token
  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    console.log(req.user);
    return req.user;
  }

  //google login
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLoginGoogle() {
    console.log('Inside google login');
  }

  //redirect
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirectGoogle(@Req() req: any) {
    return this.authService.handleRedirect(req);
  }
  @Get('google/status')
  UserStatusGoogle(@Req() req: Request) {
    if (req.user) {
      return { msg: 'Authenticated' };
    }
    else {
      return { msg: 'Not Authenticated' };
    }
  }

  @Get("/facebook")
  @UseGuards(FacebookAuthGuard)
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get("/facebook/redirect")
  @UseGuards(FacebookAuthGuard)
  async facebookLoginRedirect(@Req() req: Request): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }

  @Get('facebook/status')
  UserStatusFacebook(@Req() req: Request) {
    if (req.user) {
      return { msg: 'Authenticated' };
    }
    else {
      return { msg: 'Not Authenticated' };
    }
  }

}