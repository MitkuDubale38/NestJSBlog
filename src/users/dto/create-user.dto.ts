import { IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  name: string;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  refreshToken: string;
}
