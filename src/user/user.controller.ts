import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModule } from './user.module';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {} // user service kullanabilmek için bir constructor oluşturuldu.

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

  @Delete('')
  async deleteUser(
    @Param('id') usernameid: { id:number ; username: string },
  ): Promise<UserModule> {
    return this.userService.deleteUser(usernameid);
  }

  @Get()
  async getUser(): Promise<UserModule[]> {
    return this.userService.users({
      where: {id:2}
    });
  }
}

