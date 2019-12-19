import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../role/role.entity';
import { Avatar } from '../avatar/avatar.entity';

// tslint:disable-next-line:max-classes-per-file
export class UserDto {
  @ApiProperty()
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString()
  readonly username: string;
  @ApiProperty()
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString()
  readonly password: string;

  readonly roles: Role[];

}

// tslint:disable-next-line:max-classes-per-file
export class UpdatePasswordDto {
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly newPassword: string;
}
