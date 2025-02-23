import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { OrderItemService } from './order_items.service';
import { OrderItem } from './order_items.model';

@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  create(@Body() orderItemData: any): Promise<OrderItem> {
    return this.orderItemService.create(orderItemData);
  }

  @Get()
  findAll(): Promise<OrderItem[]> {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<OrderItem> {
    return this.orderItemService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: any,
  ): Promise<[number, OrderItem[]]> {
    return this.orderItemService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<number> {
    return this.orderItemService.remove(+id);
  }
}
