import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { CategoryModule } from './modules/category/category.module';
import { TagModule } from './modules/tag/tag.module';
import { CommentModule } from './modules/comment/comment.module';
import { RoleModule } from './modules/role/role.module';
import { FileModule } from './modules/file/file.module';
import { AvatarModule } from './modules/avatar/avatar.module';
import { ImageProcessModule } from './modules/image-process/image-process.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
    PostModule,
    CategoryModule,
    TagModule,
    CommentModule,
    RoleModule,
    FileModule,
    AvatarModule,
    ImageProcessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
