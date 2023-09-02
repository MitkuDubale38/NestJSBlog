import { IsNotEmpty, MinLength } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
export class CreatePostDto {
  @IsNotEmpty()
  @MinLength(5)
  title: string;
  @IsNotEmpty()
  body: string;
  @IsNotEmpty()
  author: User;
}
