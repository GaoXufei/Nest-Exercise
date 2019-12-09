import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './post.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../decorators/user.decorator';
import { User as UserEntity } from '../user/user.entity';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postsService: PostService,
  ) {/** */ }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(): Promise<CreatePostDto[]> {
    return await this.postsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.postsService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() data: CreatePostDto, @User() user: UserEntity) {
    return await this.postsService.create(data, user);
  }

  @Put(':id')
  async updateById(@Param('id') id: string, @Body() data: CreatePostDto) {
    return await this.postsService.updateById(id, data);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return await this.postsService.deleteById(id);
  }
}
