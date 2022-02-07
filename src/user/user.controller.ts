import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserModule } from './user.module';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';
import { UserDto } from './Dto/UserDto';

/* // TODO: JWT Authentication: 
  - https://progressivecoder.com/how-to-implement-nestjs-jwt-authentication-using-jwt-strategy/#:~:text=In%20this%20post%2C%20we%20will,as%20the%20token%20is%20valid.
  - https://www.codemag.com/Article/2001081/Nest.js-Step-by-Step-Part-3-Users-and-Authentication
  - https://www.passportjs.org/packages/
  - https://www.youtube.com/watch?v=_L225zpUK0M&ab_channel=MariusEspejo
*/
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
  
  //TODO : Şuan databasede select kullanıyosun fakat rolleri görmek için where, include kullanmak gerekli. : https://www.prisma.io/docs/concepts/components/prisma-client/crud
  //TODO:  Rollerin düzgün çalışması için Authentication(JWT) kısmını hallet. 
  
  @Post('create') // create User
  async create(@Body(ValidationPipe) data: UserDto) {
    return this.userService.createUser(data);
  }

  @Get('user/:id') // get user with id
  async findUser(@Param('id') id: string): Promise<UserModule> {
    return this.userService.findOneWithId(+id);
  }

  @Get('username/:username')  // get user with username
  async findUserUsername(@Param('username') username: string): Promise<UserModule> {
    return this.userService.findOneWithUsername(username);
  }

  @Get('all/users') // get all users
  async getAllUsers(): Promise<UserModule[]> {
    return this.userService.findAll();
  }

  @Delete('deleted/:id')  // deleted user
  async deleteUser(@Param('id') id: string): Promise<UserModule> {
    return this.userService.deleteUser(+id);
  }

}
