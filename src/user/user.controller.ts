import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModule } from './user.module';
import { FindOneParams } from './findOneParams';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';

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

  @Post('/user')
  async createUser(
    @Body()
    userData: {
      username: string;
      password: string;
      name?: string;
    }, // createUserInput 4 parametre alır.
  ): Promise<UserModule> {
    return this.userService.createUser(userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserModule> {
    return this.prisma.user.delete({ where: { id: Number(id) } });
  }

  @Get('users/:id')
  async getUserById(@Param('id') id: string): Promise<UserModule> {
    return this.prisma.user.findUnique({ where: { id: Number(id) } });
  }

  @Get('users')
  async getAllUsers(): Promise<UserModule[]> {
    return this.prisma.user.findMany()
  }
  }
