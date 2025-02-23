import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductModule } from './products/products.module';
import { OrderModule } from './orders/orders.module';
import { CartModule } from './carts/carts.module';
import { PaymentModule } from './payments/payments.module';
import { CategoryModule } from './categories/categories.module';
import { OrderItemModule } from './order_items/order_items.module';
import { ReviewModule } from './review/review.module';
import { CartProductModule } from './cart_products/cart_products.module';
import { NotificationModule } from './notifications/notifications.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ProductModule,
    OrderModule,
    CartModule,
    PaymentModule,
    CategoryModule,
    OrderItemModule,
    ReviewModule,
    CartProductModule,
    NotificationModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
