import { Controller, Post, Get, Param, Patch } from '@nestjs/common';
import { NotificationService } from './notifications.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // 📍 Foydalanuvchiga notification yuborish (faqat admin ishlatadi)
  @Post(':userId/:message')
  async sendNotification(
    @Param('userId') userId: number,
    @Param('message') message: string,
  ) {
    return this.notificationService.sendNotification(userId, message);
  }

  // 📍 Foydalanuvchining barcha xabarlari
  @Get(':userId')
  async getUserNotifications(@Param('userId') userId: number) {
    return this.notificationService.getUserNotifications(userId);
  }

  // 📍 Notificationni o‘qilgan deb belgilash
  @Patch('read/:notificationId')
  async markAsRead(@Param('notificationId') notificationId: number) {
    await this.notificationService.markAsRead(notificationId);
    return { message: 'Notification read' };
  }
}
