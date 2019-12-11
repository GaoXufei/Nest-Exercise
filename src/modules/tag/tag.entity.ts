import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Posts } from '../post/post.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  // 标签名 唯一
  @Column({ unique: true })
  name: string;

  // 标签形容 唯一 可以为空
  @Column({ unique: true, nullable: true })
  alias: string;

  @ManyToMany(type => Posts, post => post.tags)
  posts: Posts[];
}
