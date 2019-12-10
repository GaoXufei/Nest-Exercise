import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany } from 'typeorm';
import { User as UserEntity } from '../user/user.entity';

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
}
