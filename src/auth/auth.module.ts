import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { AppService } from 'src/app.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    PrismaService,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1 Day' },
    }),
  ],
  providers: [AuthService, LocalStrategy, UserService, PrismaService, AppService],
  controllers: [AuthController],
})
export class AuthModule {}
