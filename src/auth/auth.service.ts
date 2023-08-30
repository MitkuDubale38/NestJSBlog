import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { IUser } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    var user = await this.userService.login(username, password);
    const payload = { sub: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
  async register(createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
}
