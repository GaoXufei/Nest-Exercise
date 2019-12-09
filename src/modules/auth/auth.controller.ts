import { Controller, Post, Body, UseInterceptors, ClassSerializerInterceptor, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {/** */}

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() login: LoginDto ) {
    return this.authService.login(login);
  }

  @Get('test')
  @UseGuards( AuthGuard() )
  async Test() {
    return { code: 200 };
  }
}
