import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './post.dto';
import { User as UserEntity } from '../user/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
  ) {/** */ }

  async create(data: CreatePostDto, user: UserEntity) {
    const entity = await this.postsRepository.create(data);
    await this.postsRepository.save(entity);
    return entity;
  }

  async findById(id: string) {
    const entity = await this.postsRepository.findOne(id);
    return entity;
  }

  async findAll(): Promise<CreatePostDto[]> {
    const entity = await this.postsRepository.find({ relations: ['user'] });
    return entity;
  }

  async updateById(id: string, data: CreatePostDto) {
    const entity = await this.postsRepository.update(id, data);
    return entity;
  }

  async deleteById(id: string) {
    const entity = await this.postsRepository.delete(id);
    return entity;
  }
}
