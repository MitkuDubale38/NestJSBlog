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
import { AccessTokenGuard } from 'src/guard/accessToken.guard';
@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  async create(@Body(new ValidationPipe()) createPostDto: CreatePostDto) {
    return await this.postsService.create(createPostDto);
  }

  @UseGuards(AccessTokenGuard)
  @Throttle(8, 60)
  @Get('search')
  @ApiQuery({ name: 'query' })
  async search(@Query('query') query: any) {
    return await this.postsService.search(query);
  }

  @UseGuards(AccessTokenGuard)
  @UseGuards(ThrottlerGuard)
  @Get()
  @ApiQuery({ name: 'limit' })
  @ApiQuery({ name: 'page' })
  async findAll(@Query() pagination) {
    return await this.postsService.findAll(pagination);
  }

  @UseGuards(AccessTokenGuard)
  @Throttle(8, 60)
  @Get(':id')
  @ApiParam({ name: 'id' })
  async findOne(@Param('id') id: any) {
    return await this.postsService.findOne(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @ApiParam({ name: 'id' })
  async update(@Param('id') id: any, @Body() updatePostDto: UpdatePostDto) {
    return await this.postsService.update(id, updatePostDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @ApiParam({ name: 'id' })
  async remove(@Param('id') id: any) {
    return await this.postsService.remove(id);
  }
}
