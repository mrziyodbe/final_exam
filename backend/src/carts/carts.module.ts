import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from './carts.model';
import { CartProduct } from 'src/cart_products/cart_products.model';
import { CartService } from './carts.service';
import { CartController } from './carts.controller';

@Module({
  imports: [SequelizeModule.forFeature([Cart, CartProduct])],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
