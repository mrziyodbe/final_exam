import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login';
import { Role } from 'src/common/roles';
import { NotificationService } from 'src/notifications/notifications.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from './guard/auth.guard';
import { RoleGuard } from './guard/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { RoleChangeDto } from './dto/role-change.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly notificationsService: NotificationService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.authService.getUserProfile(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Post('request-role')
  async requestRoleChange(
    @Request() req,
    @Body() roleChangeDto: RoleChangeDto,
  ) {
    const result = await this.authService.requestRoleChange(
      req.user.id,
      roleChangeDto.requestedRole,
    );

    if (result.success) {
      if (roleChangeDto.requestedRole === Role.ADMIN) {
        await this.notificationsService.sendNotificationToRole(
          Role.SUPER_ADMIN,
          `Yangi admin bo'lish so'rovi: ${req.user.email}`,
        );
      } else if (roleChangeDto.requestedRole === Role.SELLER) {
        await this.notificationsService.sendNotificationToRoles(
          [Role.ADMIN, Role.SUPER_ADMIN],
          `Yangi seller bo'lish so'rovi: ${req.user.email}`,
        );
      }
    }

    return result;
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Post('confirm/:id')
  async confirmUser(@Param('id', ParseIntPipe) userId: number, @Request() req) {
    return this.authService.confirmUser(userId, req.user.role);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.SUPER_ADMIN)
  @Get('pending-admins')
  async getPendingAdmins() {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Get('pending-sellers')
  async getPendingSellers() {}
}
