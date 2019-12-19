import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, Get, Param, ParseIntPipe, Res, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from '../file/file.dto';
import { User as UserDecorator } from 'src/core/decorators/user.decorator';
import { User as UserEntity } from '../user/user.entity';
import { AvatarService } from './avatar.service';
import { Response } from 'express';

@Controller('avatars')
export class AvatarController {
  constructor(
    private readonly avatarService: AvatarService,
  ) {/** */ }

  @Post()
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('avatar'))
  async createAvatar(
    @UploadedFile() data: FileDto,
    @UserDecorator() user: UserEntity,
  ) {
    return await this.avatarService.create(data, user);
  }

  @Get('serve/:id')
  async getAvatarById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
    @Query('size') size: string,
  ) {
    const file = await this.avatarService.findById(id);
    let { filename } = file;
    filename = size ? `${filename}-${size}` : filename;
    res.sendFile(filename, {
      root: 'uploads/avatars',
      headers: {
        'Content-Type': file.mimetype,
      },
    });
  }
}
