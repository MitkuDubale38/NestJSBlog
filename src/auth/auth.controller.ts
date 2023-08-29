import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body('password') password: string,
    @Body('username') username: string,
  ): Promise<any> {
    const token = await this.authService.login(username, password);
    return { token };
  }

  @Post('register')
  async register(@Body() CreateUserDto: CreateUserDto): Promise<any> {
    const user = await this.authService.register(CreateUserDto);
    return { user };
  }
}
