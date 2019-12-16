import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
  ) {/** */ }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() data,
  ) {
    return await this.fileService.upload(data);
  }

  @Get('serve/:id')
  async getOneFileById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const file = await this.fileService.findById(id);
    res.sendFile(file.filename, {
      root: 'uploads',
      headers: {
        'Content-Type': file.mimetype,
      },
    });
  }
}
