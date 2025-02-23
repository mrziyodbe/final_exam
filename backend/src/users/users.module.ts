import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigService } from 'src/common/config/config.service';
import { NotificationService } from 'src/notifications/notifications.service';
import { Notification } from 'src/notifications/notifications.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Notification])],
  controllers: [UsersController],
  providers: [UsersService, ConfigService, NotificationService, Notification],
  exports: [UsersService],
})
export class UsersModule {}
