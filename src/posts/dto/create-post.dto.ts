import { IsNotEmpty, MinLength } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    @MinLength(5)
    title: string;
    @IsNotEmpty()
    body: string;
    @IsNotEmpty()
    author: string;
  }

