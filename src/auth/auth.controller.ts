
import { Controller, Post, UseGuards, Body, ValidationPipe, Get, Param } from '@nestjs/common';
import { Role } from 'src/Role/role.enum';
import { Roles } from 'src/Role/roles.decorator';
import { LoginDto } from 'src/user/Dto/LoginDto';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService
    ,private userService: UserService) {}

  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async login(@Body(ValidationPipe) data: LoginDto) {
    return this.authService.login(data);
  }

  // comment line : token check edilerek get methodu oluştur.
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('profile/:id')
  async getProfile(@Param('id') id:string): Promise<UserModule> {
    return this.userService.findOneWithId(+id);
  }

}
