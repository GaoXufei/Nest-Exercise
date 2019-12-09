import { Controller, Post, Body, UseInterceptors, ClassSerializerInterceptor, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {/** */ }

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() login: LoginDto) {
    return this.authService.login(login);
  }

  @Get('test')
  @UseGuards(AuthGuard())
  async Test(@User() user) {
    // tslint:disable-next-line:no-console
    console.log(user);
    return { code: 200 };
  }
}
