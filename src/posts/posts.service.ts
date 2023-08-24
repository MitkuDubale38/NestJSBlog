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

  findAll(pagination: any) {
    const paginationClass:Pagination = new Pagination();
    console.log(this.postModel.length);
    return paginationClass.paginate(pagination.limit,pagination.page, this.postModel.find(), this.postModel.length);
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
