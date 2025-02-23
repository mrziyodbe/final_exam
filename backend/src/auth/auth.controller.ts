import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login';
import { Role } from 'src/common/roles';
import { NotificationService } from 'src/notifications/notifications.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly notificationsService: NotificationService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);

    if (user.success) {
      if (createUserDto.role === Role.ADMIN) {
        await this.notificationsService.sendNotification(
          1, // Super admin ID sini qo'lda beramiz
          `Yangi admin ro‘yxatdan o‘tdi: ${createUserDto.email}`,
        );
      } else if (createUserDto.role === Role.SELLER) {
        await this.notificationsService.sendNotification(
          1, // Super admin yoki adminlarga xabar yuboriladi
          `Yangi seller ro‘yxatdan o‘tdi: ${createUserDto.email}`,
        );
      }
    }

    return user;
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

  @Post('confirm/:id')
  async confirmUser(@Param('id', ParseIntPipe) userId: number) {
    return this.authService.confirmUser(userId);
  }
}
