import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsNotEmpty, MinLength } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsNotEmpty()
  @MinLength(5)
  title: string;
  @IsNotEmpty()
  body: string;
  @IsNotEmpty()
  author: User;
}
