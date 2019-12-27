import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './post.dto';
import { User as UserEntity } from '../user/user.entity';
import { ListOptionsInterface } from 'src/core/interfaces/list-options.interface';
import { Tag } from '../tag/tag.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {/** */ }

  async beforeTags(tags: Partial<Tag[]>): Promise<any> {
    const TAGS = tags.map(async item => {
      const { id, name } = item;
      // 如果有id 说明可能在数据库中有该标签
      if (id) {
        const tag = await this.tagRepository.findOne(id);
        // 如果能查找则返回实体
        if (tag) { return tag; }
        return;
      }
      // 如果有name
      if (name) {
        // 在数据库中查找标签
        const tag = await this.tagRepository.findOne({ name });
        // 如果有则返回该实体
        if (tag) { return tag; }
        // 如果没有则在数据库中创建一条
        return await this.tagRepository.save(item);
      }
    });
    return Promise.all(TAGS);
  }

  /* * tools or service * */

  /**
   * 创建文章
   * @param data
   * @param user
   */
  async create(data: CreatePostDto, user: UserEntity) {
    const { tags } = data;
    if (tags) {
      data.tags = await this.beforeTags(tags);
    }
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
    const entity = await this.postsRepository.findOne(id, { relations: ['user', 'user.avatar'] });
    return entity;
  }
  /**
   * 查找所有文章
   * 带有category（分类）参数时进行分类查询
   */
  async findAll(options: ListOptionsInterface): Promise<[Posts[], number]> {
    const { categories, tags, page, limit, sort, order } = options;
    const queryBuilder = await this.postsRepository.createQueryBuilder('post');
    queryBuilder.leftJoinAndSelect('post.user', 'user');
    queryBuilder.leftJoinAndSelect('user.avatar', 'avatar');
    queryBuilder.leftJoinAndSelect('post.category', 'category');
    queryBuilder.leftJoinAndSelect('post.tags', 'tags');
    if (categories) {
      queryBuilder.where(`category.alias IN (:...categories)`, { categories });
    }
    if (tags) {
      queryBuilder.andWhere(`tags.name IN (:...tags)`, { tags });
    }

    // 分页
    // 请求的个数 如10 请求的页码 如3
    // 10 * ( 3 - 1 ) = 20 从第20条记录开始取值
    queryBuilder
      .take(limit)
      .skip(limit * (page - 1));

    // 排序
    queryBuilder.orderBy({ [`post.${sort}`]: order });

    const entities = await queryBuilder.getManyAndCount();
    return entities;
  }
  /**
   * 根据id修改文章
   * @param id
   * @param data
   */
  async updateById(id: string, data: CreatePostDto) {
    const { tags } = data;
    delete data.tags;
    await this.postsRepository.update(id, data);
    const entity = await this.postsRepository.findOne(id, { relations: ['category', 'tags'] });
    if (tags) {
      entity.tags = await this.beforeTags(tags);
    }
    return await this.postsRepository.save(entity);
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
      .remove({ id });
  }

  async postLiked(id: number) {
    return await this.postsRepository
      .createQueryBuilder()
      .relation(Posts, 'liked')
      .of(id)
      .loadMany();
  }
}
