import { Injectable } from '@nestjs/common';
import * as Jimp from 'jimp';

@Injectable()
export class ImageProcessService {
  resizeAvatar(path: string, filename: string) {
    const filePath = `${path}/${filename}`;
    Jimp
      .read(filePath)
      .then(image => {
        image.resize(100, 100).write(`${filePath}-100x100`);
        image.resize(200, 200).write(`${filePath}-200x200`);
        image.resize(300, 300).write(`${filePath}-300x300`);
        image.resize(600, 600).write(`${filePath}-600x600`);
      });
  }
}
