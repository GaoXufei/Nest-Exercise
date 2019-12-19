import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Avatar } from './avatar.entity';
import { Repository } from 'typeorm';
import { FileDto } from '../file/file.dto';
import { User } from '../user/user.entity';
import { ImageProcessService } from '../image-process/image-process.service';

@Injectable()
export class AvatarService {
  constructor(
    @InjectRepository(Avatar)
    private readonly avatarRepository: Repository<Avatar>,
    private readonly imageProcessService: ImageProcessService,
  ) {/** */ }

  async create(data: FileDto, user: User) {
    this.imageProcessService.resizeAvatar(`uploads/avatars`, data.filename);
    return await this.avatarRepository.save({ ...data, user });
  }

  async findById(id: number) {
    const entity = await this.avatarRepository.findOne(id);
    if (!entity) {
      throw new BadRequestException('找不到该头像信息');
    }
    return entity;
  }
}
