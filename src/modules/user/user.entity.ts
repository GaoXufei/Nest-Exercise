import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Posts } from '../post/post.entity';
import { Comment } from '../comment/comment.entity';
import { Role } from '../role/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true })
  username: string;

  @Column({ select: false })
  @Exclude()
  password: string;

  // 一对多 一个用户对应多篇文章
  @OneToMany(type => Posts, post => post.user)
  posts: Posts[];

  // 多对多 多个用户对应对片文章投票
  @ManyToMany(type => Posts, post => post.liked)
  @JoinTable()
  voted: Posts[];

  // 评论与用户的关系 多评论对用单用户
  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[];

  // 用户与角色的关系是多越多 多个用户应对多个角色
  @ManyToMany(type => Role, role => role.users)
  @JoinTable()
  roles: Role[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
