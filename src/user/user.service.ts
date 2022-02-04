import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { UserDto } from './Dto/UserDto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: 1;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
  
  async createUser(createUserDto: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data : createUserDto,
    });
  }

  async findAll(){
    return this.prisma.user.findMany();
  }

  async findOne(id: number){
    return this.prisma.user.findUnique({ where:{id}})
  }



  // async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
  //   // delete yapılıcak kullanıcının id'si ile işlem yapar.
  //   return this.prisma.user.delete({
  //     where, // benden sadece id ve username istiyor.
  //   });
  // }


  // async updateUser(params: {
  //   // İki parametreli bir obje alır. Biri update yapılıcak kısım diğeri user.
  //   where: Prisma.UserWhereUniqueInput;
  //   data: Prisma.UserUpdateInput;
  // }): Promise<User> {
  //   const { where, data } = params;
  //   return this.prisma.user.update({
  //     data,
  //     where,
  //   });
  // }
}
