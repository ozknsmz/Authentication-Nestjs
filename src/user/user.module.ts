import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService,PrismaService]
})
export class UserModule {}
