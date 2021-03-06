import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './post.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../core/decorators/user.decorator';
import { User as UserEntity } from '../user/user.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ListOptionsDecoration } from '../../core/decorators/list-options.decorator';
import { ListOptionsInterface } from 'src/core/interfaces/list-options.interface';
import { Posts } from './post.entity';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { AccessGuard } from 'src/core/guards/access.guard';
import { Permissions } from 'src/core/decorators/permissions.decorator';
import { Resource } from 'src/core/enums/resource.enum';
import { Possession } from 'src/core/enums/possession.enum';
import { UserRole } from 'src/core/enums/role.enum';

@Controller('posts')
@ApiTags('文章管理')
export class PostController {
  constructor(
    private readonly postsService: PostService,
  ) {/** */ }

  @Get()
  @ApiOperation({ summary: '查找所有文章' })
  @UseInterceptors(ClassSerializerInterceptor, TransformInterceptor)
  async findAll(
    @ListOptionsDecoration() options: ListOptionsInterface,
  ): Promise<[Posts[], number]> {
    return await this.postsService.findAll(options);
  }

  @Get(':id')
  @ApiOperation({ summary: '文章详情' })
  async findById(@Param('id') id: string) {
    return await this.postsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: '创建文章' })
  @UseGuards(AuthGuard())
  async create(@Body() data: CreatePostDto, @User() user: UserEntity) {
    return await this.postsService.create(data, user);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改文章' })
  @UseGuards(AuthGuard(), AccessGuard)
  @Permissions({ resource: Resource.POST, possession: Possession.OWN, role: UserRole.VIP })
  async updateById(@Param('id') id: string, @Body() data: CreatePostDto) {
    return await this.postsService.updateById(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除文章' })
  @UseGuards(AuthGuard()) // 疑问：目前用户是否有权限删除文章
  async deleteById(@Param('id') id: string) {
    return await this.postsService.deleteById(id);
  }

  @Post(':id/vote')
  @ApiOperation({ summary: '投票', description: '给对应id的文章投票' })
  @UseGuards(AuthGuard())
  async vote(@Param('id', ParseIntPipe) id: number, @User() user) {
    return await this.postsService.vote(id, user);
  }

  @Delete(':id/vote')
  @ApiOperation({ summary: '取消投票' })
  @UseGuards(AuthGuard())
  async unVote(@Param('id', ParseIntPipe) id: number, @User() user) {
    return await this.postsService.unVote(id, user);
  }

  @Get(':id/liked')
  @UseInterceptors(AuthGuard())
  @ApiOperation({ summary: '文章的投票列表' })
  async liked(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.postLiked(id);
  }
}
