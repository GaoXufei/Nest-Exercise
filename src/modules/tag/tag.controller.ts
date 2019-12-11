import { Controller, Post, Body, Put, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagDto } from './tag.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('tags')
@ApiTags('标签管理')
export class TagController {
  constructor(
    private readonly tagService: TagService,
  ) {/** */ }

  @Post()
  @ApiOperation({ summary: '创建标签' })
  async create(@Body() data: TagDto) {
    return await this.tagService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改标签' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: TagDto) {
    return await this.tagService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除标签' })
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    return await this.tagService.deleteOne(id);
  }
}
