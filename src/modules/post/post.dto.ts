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

// tslint:disable-next-line:max-classes-per-file
export class GetPostsDto {
  categories: string;
  tags: string;
  limit: number;
  page: number;
  sort: string;
  order: 'DESC' | 'ASC';
}
