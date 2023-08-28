import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async createUser(username: string, password: string): Promise<User> {
    return await this.userModel.create({
      username,
      password,
    });
  }

  async getUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
}
