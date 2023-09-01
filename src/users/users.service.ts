import { Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = new this.userModel(createUserDto);
      this.userModel.create(createUserDto);
      return await user.save();
    } catch (err) {
      throw err;
    }
  }

  async getUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findByUsername(username: string): Promise<User | null> {
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
