import { Module, BadRequestException } from '@nestjs/common';
import { AvatarController } from './avatar.controller';
import { AvatarService } from './avatar.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avatar } from './avatar.entity';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Avatar]),
    MulterModule.register({
      dest: './uploads/avatars',
      fileFilter: (req, file, callback) => {
        const mimetypes = [
          'image/png',
          'image/jpg',
          'image/jpeg',
        ];
        const allowed = mimetypes.some(type => type === file.mimetype);
        if (allowed) {
          callback(null, true);
        } else {
          callback(new BadRequestException('不支持上传此类型文件'), false);
        }
      },
    }),
    AuthModule,
  ],
  controllers: [AvatarController],
  providers: [AvatarService],
})
export class AvatarModule { }
