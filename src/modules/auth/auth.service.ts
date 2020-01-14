import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './auth.dto';
import { JwtPayLoad } from './auth.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {/** */ }
  /**
   * 登录
   * @param data { username, password }
   */
  async login(data: LoginDto) {
    const { username, password } = data;
    // 用户查询
    const entity = await this.userService.getOneByUserName(username, true);
    if (!entity) { return { statusCode: 404, message: '没有该用户' } }
    // 密码比对
    const isPass = await entity.comparePassword(password);
    if (!isPass) { return { statusCode: 400, message: '用户名/密码错误' } }
    // 通过
    const { id } = entity;
    const payload = { id, username };
    const token = this.signToken(payload);
    return {
      message: '登录成功',
      statusCode: 200,
      userInfo: {
        ...payload,
        token,
      }
    };
  }

  /**
   * 签发token
   * @param data { id: number, username: string }
   */
  signToken(data: JwtPayLoad) {
    return this.jwtService.sign(data);
  }
}
