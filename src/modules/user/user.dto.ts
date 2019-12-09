import { IsNotEmpty, IsString } from 'class-validator';

// tslint:disable-next-line:max-classes-per-file
export class UserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString()
  readonly username: string;
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString()
  readonly password: string;
}

// tslint:disable-next-line:max-classes-per-file
export class UpdatePasswordDto {
  readonly username: string;
  @IsNotEmpty()
  @IsString()
  readonly password: string;
  @IsNotEmpty()
  @IsString()
  readonly newPassword: string;
}
