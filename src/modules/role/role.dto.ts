import { UserRole } from 'src/core/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({ title: '角色名' })
  readonly name: UserRole;
  @ApiProperty({ title: '角色别名' })
  readonly alias: string;
}
