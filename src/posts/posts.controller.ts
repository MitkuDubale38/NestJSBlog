import { Controller, Get, Post, Body, Patch, Param, Delete,Query, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body(new ValidationPipe) createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get('search')
  @ApiQuery({ name: 'query' })
  async search(@Query('query') query: any) {
    return await this.postsService.search(query);
  }

  @Get()
  @ApiQuery({ name: 'limit' })
  @ApiQuery({ name: 'page' })
  findAll(@Query() pagination) {
    return this.postsService.findAll(pagination);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: any) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  update(@Param('id') id: any, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  remove(@Param('id') id: any) {
    return this.postsService.remove(id);
  }
}
