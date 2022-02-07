
import { Controller, Request, Post, UseGuards, Body, ValidationPipe } from '@nestjs/common';
import { LoginDto } from 'src/user/Dto/LoginDto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async create(@Body(ValidationPipe) data: LoginDto) {
    return this.authService.login(data);
  }
}
