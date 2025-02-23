import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Notification } from './notifications.model';
import { NotificationService } from './notifications.service';
import { NotificationController } from './notifications.controller';
import { User } from 'src/users/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Notification, User])],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
