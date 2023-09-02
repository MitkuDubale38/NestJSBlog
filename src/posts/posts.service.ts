import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pagination } from 'src/helpers/pagination';
import { IPost } from './interfaces/post.interface';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(@InjectModel('Post') private postModel: Model<IPost>) {}
  create(createPostDto: CreatePostDto) {
    return this.postModel.create(createPostDto);
  }
  async findAll(pagination: any) {
    const paginationClass: Pagination = new Pagination();
    try {
      return paginationClass.paginate(
        pagination.limit,
        pagination.page,
        this.postModel.find().populate('author', null, User.name).exec(),
        (await this.postModel.find()).length,
      );
    } catch (err) {
      throw err;
    }
  }
  async search(query: any): Promise<any[]> {
    const posts = await this.postModel
      .find()
      .find()
      .populate('author', null, User.name)
      .exec();
    const result = posts.filter(
      (post) =>
        post.title.includes(query) ||
        post.body.includes(query) ||
        post.author.includes(query),
    );
    return result;
  }
  catch(err) {
    throw err;
  }

  async findOne(id: any) {
    try {
      const post = await this.postModel
        .findOne({ _id: id })
        .find()
        .populate('author', null, User.name)
        .exec();
      if (!post) {
        throw new HttpException('Post not found', 404);
      }
      return post;
    } catch (err) {
      throw err;
    }
  }
  async update(id: any, updatePostDto: UpdatePostDto) {
    try {
      return await this.postModel
        .findOneAndUpdate({ _id: id }, { updatePostDto })
        .exec();
    } catch (err) {
      throw err;
    }
  }
  async remove(id: any) {
    try {
      return await this.postModel.findOneAndRemove({ _id: id }).exec();
    } catch (err) {
      throw err;
    }
  }
}
