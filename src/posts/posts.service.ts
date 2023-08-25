import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pagination } from 'src/helpers/pagination';

@Injectable()
export class PostsService {
  constructor(@InjectModel("Post") private postModel: Model<Post>) {}
  create(createPostDto: CreatePostDto) {
    return this.postModel.create(createPostDto);
  }
  async findAll(pagination: any) {
    const paginationClass:Pagination = new Pagination();
    return paginationClass.paginate(pagination.limit,pagination.page, this.postModel.find(), (await this.postModel.find()).length);
  }
  async search(query: any): Promise<any[]> {
    const posts = await this.postModel.find().exec();
    var result = posts.filter((post) => post.title.includes(query) || post.body.includes(query) || post.author.includes(query));
    return result;
  }
  findOne(id: any) {
    return this.postModel.findOne({_id: id}).exec();
  }
  update(id: any, updatePostDto: UpdatePostDto) {
    return this.postModel.findOneAndUpdate({ _id: id },{ updatePostDto} ).exec();
  }
  remove(id: any) {
    return this.postModel.findOneAndRemove({_id: id}).exec();
  }
  
}

