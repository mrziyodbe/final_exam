import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from './notifications.model';
import { User } from 'src/users/user.model';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification)
    private notificationRepository: typeof Notification,
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  async sendNotification(
    userId: number,
    message: string,
  ): Promise<Notification> {
    return await this.notificationRepository.create({
      user_id: userId,
      message,
    });
  }

  async getUserNotifications(userId: number): Promise<Notification[]> {
    return await this.notificationRepository.findAll({
      where: { user_id: userId },
      order: [['created_at', 'DESC']],
    });
  }

  async markAsRead(notificationId: number): Promise<void> {
    await this.notificationRepository.update(
      { is_read: true },
      { where: { id: notificationId } },
    );
  }

  async notifySuperAdminAboutNewAdminRequest(newAdminId: number) {
    const superAdmin = await User.findOne({
      where: { role: 'super_admin' },
      attributes: ['id'],
    });

    if (superAdmin) {
      await this.sendNotification(
        superAdmin.id,
        `Yangi admin tasdiqlashni kutmoqda: UserID ${newAdminId}`,
      );
    }
  }
}
