import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly jwtService: JwtService
  ) {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    const Authorization = request.headers.authorization;

    if (!Authorization) {
      throw new HttpException({ statusCode: 404, message: '没有token，请登录' }, 200)
    }

    if (Authorization) {
      const token = Authorization.replace('Bearer ', '');
      try {
        const verify = this.jwtService.verify(token);
      } catch (e) {
        throw new HttpException({ statusCode: 401, message: 'token过期，请重新登录' }, 200)
      }
    }

    return super.canActivate(context)
  }

  handleRequest(err, user, info) {
    return user;
  }
}
