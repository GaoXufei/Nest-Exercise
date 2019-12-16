import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './post.entity';
import { AuthModule } from '../auth/auth.module';
import { Tag } from '../tag/tag.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Posts, Tag]),
    AuthModule,
    UserModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule { }
