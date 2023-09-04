import { User } from 'src/users/entities/user.entity';

export interface IPost {
  title: string;
  body: string;
  author: User;
}
