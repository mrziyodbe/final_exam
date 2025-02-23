import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderItem } from './order_items.model';
import { OrderItemService } from './order_items.service';
import { OrderItemController } from './order_items.controller';

@Module({
  imports: [SequelizeModule.forFeature([OrderItem])],
  controllers: [OrderItemController],
  providers: [OrderItemService],
  exports: [OrderItemService],
})
export class OrderItemModule {}
