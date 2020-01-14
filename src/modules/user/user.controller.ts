import { Controller, Get, Post, Body, Query, UseInterceptors, ClassSerializerInterceptor, Put, ParseIntPipe, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UpdatePasswordDto } from './user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AccessGuard } from 'src/core/guards/access.guard';
import { Permissions } from 'src/core/decorators/permissions.decorator';
import { UserRole } from 'src/core/enums/role.enum';
import { User } from '../../core/decorators/user.decorator';

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
    return this.userService.getOneByUserName(username, true);
  }

  @Get('/token')
  @ApiOperation({ summary: '查找用户(token)' })
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  async findOneByUserToken(
    @User() user
  ) {
    const { username } = user;
    return this.userService.getOneByUserName(username, true)
  }

  @Put()
  @ApiOperation({ summary: '修改用户密码' })
  @UseInterceptors(ClassSerializerInterceptor)
  async updatePassword(@Body() data: UpdatePasswordDto) {
    return await this.userService.updatePassword(data);
  }

  @Get(':id/liked')
  @ApiOperation({ summary: '查找用户喜欢的文章列表' })
  @UseInterceptors(ClassSerializerInterceptor)
  async findUserLinked(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findLinked(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard(), AccessGuard)
  @Permissions({ role: UserRole.ADMIN })
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserDto,
  ) {
    return await this.userService.updateRole(id, data);
  }

  @Get(':id/possess/:resource/:resourceId')
  async possess(
    @Param('id', ParseIntPipe) id: number,
    @Param('resource') resource: string,
    @Param('resourceId', ParseIntPipe) resourceId: number,
  ) {
    return await this.userService.possess(id, resource, resourceId);
  }
}
