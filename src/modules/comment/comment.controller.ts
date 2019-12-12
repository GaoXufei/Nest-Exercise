import {
  Controller,
  Post,
  UseGuards,
  Body,
  Param,
  ParseIntPipe,
  Put,
  Delete,
  Get,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { CommentDto } from './comment.dto';
import { User as UserDecorator } from '../decorators/user.decorator';
import { User as UserEntity } from '../user/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('评论模块')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) {/** */ }

  @ApiOperation({ summary: '创建评论' })
  @Post('post/:id/comments')
  @UseGuards(AuthGuard())
  async createPostComment(
    @Body() data: CommentDto,
    @UserDecorator() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.commentService.create(id, data, user);
  }

  @ApiOperation({ summary: '修改评论' })
  @Put('comment/:id')
  @UseGuards(AuthGuard())
  async updatePostComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CommentDto,
  ) {
    return await this.commentService.update(id, data);
  }

  @ApiOperation({ summary: '删除评论' })
  @Delete('comment/:id')
  @UseGuards(AuthGuard())
  async destory(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.commentService.delete(id);
  }

  @ApiOperation({ summary: '文章评论列表' })
  @Get('post/:id/comments')
  async getPostComments(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.commentService.getPostComments(id);
  }

  @ApiOperation({ summary: '用户评论列表' })
  @Get('user/:id/comments')
  async getUserComments(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.commentService.getUserComments(id);
  }
}
