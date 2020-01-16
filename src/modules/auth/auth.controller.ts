import { Controller, Post, Body, UseInterceptors, ClassSerializerInterceptor, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
// import { AuthGuard } from '@nestjs/passport';
import { User } from '../../core/decorators/user.decorator';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/auth.guard';

@Controller('auth')
@ApiTags('权限管理')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {/** */ }

  @Post('login')
  @ApiOperation({ summary: '登录', description: '登录后返回token，需要在以后的请求头部中添加token' })
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() login: LoginDto) {
    return this.authService.login(login);
  }

  @Get('test')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async Test(@User() user) {
    // tslint:disable-next-line:no-console
    console.log(user, 'test');
    return { code: 200 };
  }
}
