import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { JwtPayLoad } from '../auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'efdff99b82aed4f91cecb5293ec9d52b54cc3bcb',
    });
  }

  async validate(payload: JwtPayLoad, done: VerifiedCallback) {
    // tslint:disable-next-line:no-console
    console.log( payload );
  }
}
