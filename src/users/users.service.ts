import { Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}
  async createUser(createUserDto: CreateUserDto) {
    var user = await this.userModel.create(createUserDto);
    return user;
  }

  async getUsers(): Promise<IUser[]> {
    return await this.userModel.find().exec();
  }

  async findById(id: string): Promise<IUser | null> {
    return this.userModel.findById(id).exec();
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async login(username: string, password: string) {
    var user = await this.userModel.findOne({ username, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
