import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { JwtPayLoad } from '../auth.interface';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'efdff99b82aed4f91cecb5293ec9d52b54cc3bcb',
    });
  }

  async validate(payload: JwtPayLoad, done: VerifiedCallback, error: any) {
    // tslint:disable-next-line:no-console
    console.log(payload, 'payload');

    const { username } = payload;
    const entity = await this.userService.getOneByUserName(username);
    if (!entity) {
      done(new UnauthorizedException('没有找到该用户'));
    }
    done(null, entity);

  }
}
