import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { Repository } from 'typeorm';
import { TagDto } from './tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {/** */ }

  async create(data: TagDto) {
    const entity = await this.tagRepository.create(data);
    return await this.tagRepository.save(entity);
  }

  async update(id: number, data: TagDto) {
    return await this.tagRepository.update(id, data);
  }

  async deleteOne(id: number) {
    return this.tagRepository.delete(id);
  }
}
