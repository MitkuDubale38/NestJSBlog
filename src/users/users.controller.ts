import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  //   @Post('/signup')
  //   async createUser(
  //     @Body('password') password: string,
  //     @Body('username') username: string,
  //   ): Promise<User> {
  //     const saltOrRounds = 10;
  //     const hashedPassword = await bcrypt.hash(password, saltOrRounds);
  //     const result = await this.usersService.createUser(username, hashedPassword);
  //     return result;
  //   }

  //   @UseGuards(AuthGuard('jwt'))
  @Post('signup')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
    
  }

  @Get()
  async getUser() {
    return this.usersService.getUsers();
  }
}
