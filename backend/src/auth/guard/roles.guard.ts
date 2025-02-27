import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { ConfigService } from '@nestjs/config'; // ✅ TO‘G‘RI IMPORT
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/common/roles';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RoleGuard extends AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    configService: ConfigService,
    userService: UsersService,
  ) {
    super(configService, userService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuth = await super.canActivate(context);
    if (!isAuth) return false;

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!requiredRoles.some((role) => user.role.includes(role))) {
      throw new ForbiddenException(
        'Sizda buni amalga oshirish uchun huquq yo‘q',
      );
    }

    return true;
  }
}
