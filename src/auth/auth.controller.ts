
import { Controller, Post, UseGuards, Body, ValidationPipe, Get, Param } from '@nestjs/common';
import { LoginDto } from 'src/user/Dto/LoginDto';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async create(@Body(ValidationPipe) data: LoginDto) {
    return this.authService.login(data);
  }

  // comment line : token check edilerek get methodu oluştur.
  
  // @UseGuards(JwtAuthGuard)
  // @Get('profile/:id')
  // async getProfile(@Param('id') id:string): Promise<AuthModule> {
  //   return this.
  // }

}
