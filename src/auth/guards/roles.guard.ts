import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role_type, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ROLES_KEY } from 'src/Role/roles.decorator';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role_type[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const User = this.userService.findOneWithUsername(user.username);
    User.then((res) => {
      return requiredRoles.some((role) => res.user_role?.includes(role));
    });

    // return requiredRoles.some((role) =>
    //   User.then((res) => {
    //     requiredRoles.some((role) => res.user_role?.includes(role));
    //   })
    // );
  }
}
