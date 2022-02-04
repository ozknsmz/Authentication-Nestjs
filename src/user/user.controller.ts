import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserModule } from './user.module';
import { FindOneParams } from './findOneParams';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';
import { UserDto } from './Dto/UserDto';


@Controller('')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private prisma: PrismaService,
  ) {} // user service kullanabilmek için bir constructor oluşturuldu.

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }
  
  //TODO : Şuan databasede select kullanıyosun fakat rolleri görmek için where, include kullanmak gerekli.
  //TODO:  Rollerin düzgün çalışması için Authentication(JWT) kısmını hallet. 
  
  @Post('create')
  async create(@Body(ValidationPipe) data: UserDto) {
    console.log(data);
    return this.userService.createUser(data);
  }

  @Get('user/:id')
  async findUser(@Param('id') id: string): Promise<UserModule> {
    return this.userService.findOneUser(+id);
  }

  @Get('all/users')
  async getAllUsers(): Promise<UserModule[]> {
    return this.userService.findAll();
  }

  @Delete('deleted/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModule> {
    return this.userService.deleteUser(+id);
  }

  // @Delete()
  // async deleteAll(){
  //   return this.prisma.user.delete();
  // }

  // @Get('user/:id')
  // async getUserById(@Param('id') id: string): Promise<UserModule> {
  //   return this.prisma.user.findUnique({ where: { id: Number(id) } });
  // }
}
