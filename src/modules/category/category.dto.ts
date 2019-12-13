import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CategoryDto {
  @ApiProperty({ description: '分类名称' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: '分类的英文名字或者简写' })
  @IsNotEmpty()
  readonly alias: string;
}
