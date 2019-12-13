import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../category/category.entity';
import { Tag } from '../tag/tag.entity';

export class CreatePostDto {
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly content: string;
  @ApiProperty()
  readonly category: Category;
  @ApiProperty({ description: '标签列表' })
  tags: Tag[];
}
