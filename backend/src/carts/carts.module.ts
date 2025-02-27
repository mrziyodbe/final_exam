import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from './carts.model';
import { CartProduct } from 'src/cart_products/cart_products.model';
import { CartService } from './carts.service';
import { CartController } from './carts.controller';
import { ConfigService } from 'src/common/config/config.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.model';
import { NotificationService } from 'src/notifications/notifications.service';
import { Notification } from 'src/notifications/notifications.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Cart, CartProduct, User, Notification]),
  ],
  controllers: [CartController],
  providers: [CartService, ConfigService, UsersService, NotificationService],
  exports: [CartService],
})
export class CartModule {}
