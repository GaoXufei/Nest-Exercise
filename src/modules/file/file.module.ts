import { Module, BadRequestException } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    MulterModule.register({
      dest: './uploads',
      fileFilter: (req, file, callback) => {
        const mimetype = [
          'image/png',
          'image/jpg',
          'image/jpeg',
        ];
        const allowed = mimetype.some(type => type === file.mimetype);
        allowed ? callback(null, true) : callback(new BadRequestException('不支持上传的文件类型'), false);
      },
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule { }
