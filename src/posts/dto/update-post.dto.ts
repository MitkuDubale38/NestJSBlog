import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsMongoId, IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsNotEmpty()
  @MinLength(5)
  title: string;
  @IsNotEmpty()
  body: string;
  @IsNotEmpty()
  @IsMongoId()
  author: string;
}
