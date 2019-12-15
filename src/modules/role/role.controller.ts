import { Controller, Post, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleDto } from './role.dto';

@ApiTags('用户角色管理')
@Controller('roles')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
  ) {/** */ }

  @ApiOperation({ summary: '创建用户角色' })
  @Post()
  async create(@Body() data: RoleDto) {
    return await this.roleService.create(data);
  }
}
