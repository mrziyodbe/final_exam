import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from 'src/common/config/config.service';
import { UsersService } from 'src/users/users.service';
import * as jwt from 'jsonwebtoken';

interface JWTPayload extends jwt.JwtPayload {
  email: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {}

  private isValidPayload(
    payload: string | jwt.JwtPayload,
  ): payload is JWTPayload {
    return (
      typeof payload === 'object' &&
      payload !== null &&
      'email' in payload &&
      typeof payload.email === 'string'
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new BadRequestException('Authorization header not provided');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new BadRequestException('Token not provided');
    }

    try {
      const decoded = jwt.verify(token, this.configService.get('JWT_SECRET'));
      console.log(decoded);

      if (!this.isValidPayload(decoded)) {
        throw new BadRequestException('Invalid token payload');
      }

      const user = await this.userService.findOneByEmail(decoded.email);

      if (!user) {
        throw new BadRequestException('User not found');
      }

      request.user = user;
      return true;
    } catch {
      throw new BadRequestException('Token notogri');
    }
  }
}
