import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({ name: '分类名称', description: '分类名称' })
  readonly name: string;
  @ApiProperty({ name: '分类别名', description: '分类的英文名字或者简写' })
  readonly alias: string;
}
