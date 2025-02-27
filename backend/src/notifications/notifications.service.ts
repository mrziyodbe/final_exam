import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from './notifications.model';
import { User } from 'src/users/user.model';
import { Role } from 'src/common/roles';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification)
    private readonly notificationModel: typeof Notification,
    @InjectModel(User) private readonly userModel: typeof User,
  ) {}

  async sendNotification(userId: number, message: string) {
    return this.notificationModel.create({
      userId,
      message,
      isRead: false,
    });
  }

  async sendNotificationToRole(role: Role, message: string) {
    const users = await this.userModel.findAll({
      where: {
        role,
        isApproved: true,
      },
    });

    const notifications = [];
    for (const user of users) {
      notifications.push(
        this.notificationModel.create({
          userId: user.id,
          message,
          isRead: false,
        }),
      );
    }

    return Promise.all(notifications);
  }

  async sendNotificationToRoles(roles: Role[], message: string) {
    const users = await this.userModel.findAll({
      where: {
        role: roles,
        isApproved: true,
      },
    });

    const notifications = [];
    for (const user of users) {
      notifications.push(
        this.notificationModel.create({
          userId: user.id,
          message,
          isRead: false,
        }),
      );
    }

    return Promise.all(notifications);
  }

  async getUserNotifications(userId: number) {
    return this.notificationModel.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
  }

  async markAsRead(notificationId: number, userId: number) {
    const notification = await this.notificationModel.findOne({
      where: { id: notificationId, userId },
    });

    if (notification) {
      notification.isRead = true;
      await notification.save();
      return { success: true };
    }

    return { success: false, message: 'Notification not found' };
  }
}
