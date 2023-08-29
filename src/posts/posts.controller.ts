import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createPostDto: CreatePostDto) {
    return await this.postsService.create(createPostDto);
  }

  @Throttle(8, 60)
  @Get('search')
  @ApiQuery({ name: 'query' })
  async search(@Query('query') query: any) {
    return await this.postsService.search(query);
  }

  @UseGuards(ThrottlerGuard)
  @Get()
  @ApiQuery({ name: 'limit' })
  @ApiQuery({ name: 'page' })
  async findAll(@Query() pagination) {
    return await this.postsService.findAll(pagination);
  }

  @Throttle(8, 60)
  @Get(':id')
  @ApiParam({ name: 'id' })
  async findOne(@Param('id') id: any) {
    return await this.postsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  async update(@Param('id') id: any, @Body() updatePostDto: UpdatePostDto) {
    return await this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  async remove(@Param('id') id: any) {
    return await this.postsService.remove(id);
  }
}
