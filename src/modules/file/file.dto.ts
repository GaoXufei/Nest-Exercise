import { ApiProperty } from '@nestjs/swagger';

export class FileDto {
  @ApiProperty({ title: '字段名' })
  readonly fieldname: string;
  @ApiProperty({ title: '原来的名字' })
  readonly originalname: string;
  @ApiProperty({ title: '编码' })
  readonly encoding: string;
  @ApiProperty({ title: '类型' })
  readonly mimetype: string;
  @ApiProperty({ title: '文件夹' })
  readonly destination: string;
  @ApiProperty({ title: '文件名' })
  readonly filename: string;
  @ApiProperty({ title: '路径' })
  readonly path: string;
  @ApiProperty({ title: '尺寸' })
  readonly size: number;
}
