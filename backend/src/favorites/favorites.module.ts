import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { Favorite } from './favorite.model';
import { ConfigService } from 'src/common/config/config.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.model';
import { NotificationService } from 'src/notifications/notifications.service';
import { Notification } from 'src/notifications/notifications.model';

@Module({
  imports: [SequelizeModule.forFeature([Favorite, User, Notification])],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    ConfigService,
    UsersService,
    NotificationService,
  ],
})
export class FavoritesModule {}
