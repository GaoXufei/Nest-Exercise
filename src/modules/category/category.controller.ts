import { Controller, Post, Body } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './category.dto';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ) {/** */ }

  @Post()
  async create(@Body() data: CategoryDto) {
    return await this.categoryService.create(data);
  }
}
