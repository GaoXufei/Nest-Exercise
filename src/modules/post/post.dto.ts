import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../category/category.entity';

export class CreatePostDto {
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly content: string;
  @ApiProperty()
  readonly category: Category;
}
