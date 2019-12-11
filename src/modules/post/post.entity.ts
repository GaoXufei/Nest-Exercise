import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User as UserEntity } from '../user/user.entity';
import { Category } from '../category/category.entity';
import { Tag } from '../tag/tag.entity';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('longtext')
  content: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  // 多对一关系 多文章对应一个用户
  @ManyToOne(type => UserEntity, user => user.posts)
  user: UserEntity;

  // 多对多关系 多文章对应多用投票
  @ManyToMany(type => UserEntity, user => user.voted)
  liked: UserEntity[];

  // 多对一的关系 多个文章对应一个分类
  @ManyToOne(type => Category, category => category.posts)
  category: Category;

  // 多对多关系 多个标签对应多个文章
  @ManyToMany(type => Tag, tag => tag.posts)
  @JoinTable()
  tags: Tag[];
}
