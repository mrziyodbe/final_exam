import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { NotificationService } from './notifications.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(AuthGuard)
  @Post(':userId/:message')
  async sendNotification(
    @Param('userId') userId: number,
    @Param('message') message: string,
    @Request() req,
  ) {
    if (req.user.role !== 'ADMIN' && req.user.id !== userId) {
      throw new ForbiddenException(
        'You are not allowed to send this notification.',
      );
    }
    return this.notificationService.sendNotification(userId, message);
  }

  @UseGuards(AuthGuard)
  @Get(':userId')
  async getUserNotifications(@Param('userId') userId: number, @Request() req) {
    if (req.user.role !== 'ADMIN' && req.user.id !== userId) {
      throw new ForbiddenException(
        'You are not allowed to view these notifications.',
      );
    }
    return this.notificationService.getUserNotifications(userId);
  }

  @UseGuards(AuthGuard)
  @Patch('read/:notificationId')
  async markAsRead(
    @Param('notificationId') notificationId: number,
    @Request() req,
  ) {
    await this.notificationService.markAsRead(notificationId, req.user.id);
    return { message: 'Notification read' };
  }
}
