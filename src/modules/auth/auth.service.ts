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
  ) {/** */}
  /**
   * 登录
   * @param data { username, password }
   */
  async login(data: LoginDto) {
    const { username, password } = data;
    // 用户查询
    const entity = await this.userService.getOneByUserName(username);
    if ( !entity ) { throw new UnauthorizedException('用户不存在'); }
    // 密码比对
    const isPass = await entity.comparePassword(password);
    if ( !isPass ) { throw new UnauthorizedException('密码不正确'); }
    // 通过
    const { id } = entity;
    const payload = { id, username };
    const token = this.signToken(payload);
    return {
      ...payload,
      token,
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
