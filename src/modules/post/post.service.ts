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

  /**
   * 创建文章
   * @param data
   * @param user
   */
  async create(data: CreatePostDto, user: UserEntity) {
    const entity = await this.postsRepository.create(data);
    await this.postsRepository.save({
      ...entity,
      user,
    });
    return entity;
  }
  /**
   * 根据id查找文章
   * @param id
   */
  async findById(id: string) {
    const entity = await this.postsRepository.findOne(id);
    return entity;
  }
  /**
   * 查找所有文章
   */
  async findAll(): Promise<CreatePostDto[]> {
    const entity = await this.postsRepository.find({ relations: ['user'] });
    return entity;
  }
  /**
   * 根据id修改文章
   * @param id
   * @param data
   */
  async updateById(id: string, data: CreatePostDto) {
    const entity = await this.postsRepository.update(id, data);
    return entity;
  }
  /**
   * 根据id删除对应文章
   * @param id
   */
  async deleteById(id: string) {
    const entity = await this.postsRepository.delete(id);
    return entity;
  }

  /**
   * 投票 增加对应的关系
   * @param id
   * @param user
   */
  async vote(id: number, user: UserEntity) {
    await this
      .postsRepository
      // 创建关系
      .createQueryBuilder()
      // 设置关系 用户实体 在用户实体中定义的关系
      .relation(UserEntity, 'voted')
      // 当前用户的信息
      .of(user)
      // 被投票的文章id
      .add(id);
  }

  /**
   * 取消投票 同上
   * @param id
   * @param user
   */
  async unVote(id: number, user: UserEntity) {
    await this
      .postsRepository
      .createQueryBuilder()
      .relation(UserEntity, 'voted')
      .of(user)
      .remove({id});
  }

  async postLiked(id: number) {
    return await this.postsRepository
      .createQueryBuilder()
      .relation(Posts, 'liked')
      .of(id)
      .loadMany();
  }
}
