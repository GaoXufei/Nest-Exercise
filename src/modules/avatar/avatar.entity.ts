import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, AfterLoad } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Avatar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @ManyToOne(type => User, user => user.avatar, { nullable: false })
  user: User;

  url: string;

  @AfterLoad()
  getUrl() {
    const appUrl = process.env.APP_URL;
    this.url = `${appUrl}/avatars/serve/${this.id}`;
  }
}
