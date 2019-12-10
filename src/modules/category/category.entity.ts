import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Posts } from '../post/post.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  alias: string;

  @OneToMany(type => Posts, post => post.category)
  posts: Posts[];
}
