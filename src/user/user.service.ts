import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';


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
    skip?: 1;    "name" : "özkan"
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

  async createUser(getUserInput: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: getUserInput,
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: {id},
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOneWithId(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findOneWithUsername(username: string) {    
    return this.prisma.user.findUnique({ where: { username } });
  }

  async getUser(getUserInput: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data : getUserInput,
    });
  }

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
