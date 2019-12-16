import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './file.entity';
import { Repository } from 'typeorm';
import { FileDto } from './file.dto';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {/** */ }

  async upload(data: FileDto) {
    return await this.fileRepository.save(data);
  }

  async findById(id: number) {
    return await this.fileRepository.findOne(id);
  }
}
