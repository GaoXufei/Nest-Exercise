import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

const possportModule = PassportModule.register({
  defaultStrategy: 'jwt',
});

@Module({
  imports: [
    JwtModule.register({
      secret: 'efdff99b82aed4f91cecb5293ec9d52b54cc3bcb',
      signOptions: {
        expiresIn: '12h',
      },
    }),
    possportModule,
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [
    possportModule,
  ],
})
export class AuthModule { }
