import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartProduct } from './cart_products.model';
import { CartProductService } from './cart_products.service';
import { CartProductController } from './cart_products.controller';

@Module({
  imports: [SequelizeModule.forFeature([CartProduct])],
  controllers: [CartProductController],
  providers: [CartProductService],
  exports: [CartProductService],
})
export class CartProductModule {}
