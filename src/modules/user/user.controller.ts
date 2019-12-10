import { Controller, Get, Post, Body, Query, UseInterceptors, ClassSerializerInterceptor, Put, ParseIntPipe, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UpdatePasswordDto } from './user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('users')
@ApiTags('用户管理')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {/** */ }

  @Post()
  @ApiOperation({ summary: '创建用户' })
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() data: UserDto) {
    return await this.userService.create(data);
  }

  @Get()
  @ApiOperation({ summary: '查找用户' })
  @UseInterceptors(ClassSerializerInterceptor)
  async findOneByUserName(@Query('username') username: string) {
    return this.userService.getOneByUserName(username);
  }

  @Put()
  @ApiOperation({ summary: '修改用户密码' })
  @UseInterceptors(ClassSerializerInterceptor)
  async updatePassword(@Body() data: UpdatePasswordDto) {
    return await this.userService.updatePassword(data);
  }

  @Get(':id/liked')
  @ApiOperation({ summary: '查找用户喜欢的文章列表' })
  @UseInterceptors( ClassSerializerInterceptor )
  async findUserLinked(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findLinked(id);
  }
}
