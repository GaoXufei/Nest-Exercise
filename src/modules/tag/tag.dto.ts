import { ApiProperty } from '@nestjs/swagger';

export class TagDto {
  @ApiProperty({ description: '标签名' })
  readonly name: string;
  @ApiProperty({ description: '标签别名' })
  readonly alias: string;

}
