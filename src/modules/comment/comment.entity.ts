import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Posts } from '../post/post.entity';
import { User } from '../user/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column()
  content: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  // 评论跟文章的关系 多个评论对应一篇文章
  @ManyToOne(type => Posts, post => post.comments, { nullable: false })
  post: Posts;

  // 评论与用户的关系 多个评论对应一个用户
  @ManyToOne(type => User, user => user.comments, { nullable: false })
  user: User;
}
