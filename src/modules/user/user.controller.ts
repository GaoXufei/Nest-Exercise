import { Controller, Get, Post, Body, Query, UseInterceptors, ClassSerializerInterceptor, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UpdatePasswordDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {/** */ }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() data: UserDto) {
    return await this.userService.create(data);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findOneByUserName(@Query('username') username: string) {
    return this.userService.getOneByUserName(username);
  }

  @Put()
  @UseInterceptors(ClassSerializerInterceptor)
  async updatePassword(@Body() data: UpdatePasswordDto) {
    return await this.userService.updatePassword(data);
  }
}
