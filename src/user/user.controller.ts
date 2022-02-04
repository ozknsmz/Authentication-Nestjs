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

  @Post()
  async create(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }

  @Get('user/:id')
  async findUser(@Param('id') id: string): Promise<UserModule> {
    return this.userService.findOneUser(+id);
  }

  @Delete('deleted/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModule> {
    return this.userService.deleteUser(+id);
  }

  

  // @Delete()
  // async deleteAll(){
  //   return this.prisma.user.delete();
  // }


  // @Post('/user')
  // async createUser(
  //   @Body()
  //   userData: {
  //     username: string;
  //     password: string;
  //     name?: string;
  //   }, // createUserInput 4 parametre alır.
  // ): Promise<UserModule> {
  //   return this.userService.createUser(userData);
  // }

  //   @Post('user')
  //   async addUser(@Body() data: Prisma.UserCreateInput): Promise<User> {
  //     // user oluşturur.
  //     return this.prisma.user.create({
  //       data,
  //     });
  // }

  // @Post('/user')
  // @HttpCode(200)
  // @UsePipes(ValidationPipe)
  // createUser(@Body() userData: UserDto){
  //   return { data: userData}
  // }

  // @Get('all/users')
  // async getAllUsers(): Promise<UserModule[]> {
  //   return this.prisma.user.findMany()
  // }

  // @Delete('deleted/:id')
  // async deleteUser(@Param('id') id: string): Promise<UserModule> {
  //   return this.prisma.user.delete({ where: { id: Number(id) } });
  // }

  // @Get('user/:id')
  // async getUserById(@Param('id') id: string): Promise<UserModule> {
  //   return this.prisma.user.findUnique({ where: { id: Number(id) } });
  // }
}
