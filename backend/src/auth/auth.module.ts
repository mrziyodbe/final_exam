import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { UsersService } from '../users/users.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { NotificationService } from 'src/notifications/notifications.service';
import { Notification } from 'src/notifications/notifications.model';
import { ConfigModule } from 'src/common/config/config.module';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtService, NotificationService],
  imports: [
    ConfigModule,
    SequelizeModule.forFeature([User, Notification]),
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION_TIME'),
        },
      }),
    }),
  ],
})
export class AuthModule {}
