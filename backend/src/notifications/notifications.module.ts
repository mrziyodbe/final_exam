import { ConfigService } from './../common/config/config.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Notification } from './notifications.model';
import { NotificationService } from './notifications.service';
import { NotificationController } from './notifications.controller';
import { User } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [SequelizeModule.forFeature([Notification, User])],
  providers: [NotificationService, ConfigService, UsersService],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
