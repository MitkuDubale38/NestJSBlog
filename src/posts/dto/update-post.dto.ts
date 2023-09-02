import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsNotEmpty()
  @MinLength(5)
  title: string;
  @IsNotEmpty()
  body: string;
  @ApiProperty({
    type: Types.ObjectId,
    description: 'ID of the author or User object',
  })
  @IsString()
  @IsNotEmpty()
  author: Types.ObjectId | User;
}
