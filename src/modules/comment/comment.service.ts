import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { CommentDto } from './comment.dto';
import { User as UserEntity } from '../user/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {/** */ }

  /**
   * 创建评论
   * @param id 用户id
   * @param data 评论内容
   * @param user 用户信息
   */
  async create(id: number, data: CommentDto, user: UserEntity) {
    /**
     * json example
     * {
     *  user: { username: '李白' ...},
     *  title: 'xxx',
     *  content: 'xxx',
     *  post: { id: 15 }
     * }
     */
    return await this.commentRepository.save({
      ...data,
      user,
      post: { id },
    });
  }

  async update(id: number, data: CommentDto) {
    // ??? 用户是否有权限 ???
    return await this.commentRepository.update(id, data);
  }

  async delete(id: number) {
    return await this.commentRepository.delete(id);
  }

  /**
   * 获取当前文章的所有评论 包含 评论作者 评论内容...
   * @param id 文章id
   */
  async getPostComments(id: number) {
    return await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.post', 'post')
      .where(`post.id = :id`, { id })
      .getMany();
  }

  /**
   * 获取当前用户的评论记录
   * @param id 用户id
   */
  async getUserComments(id: number) {
    return await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.post', 'post')
      .where(`user.id = :id`, { id })
      .getMany();
  }
}
