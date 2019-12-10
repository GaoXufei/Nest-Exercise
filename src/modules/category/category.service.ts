import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category as CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {/** */ }

  async create(data: CategoryDto) {
    const entity = await this.categoryRepository.create(data);
    return this.categoryRepository.save(entity);
  }
}
