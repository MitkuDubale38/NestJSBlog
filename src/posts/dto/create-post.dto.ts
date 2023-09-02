import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Types } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export class CreatePostDto {
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
