import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderItem } from './order_items.model';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectModel(OrderItem) private orderItemModel: typeof OrderItem,
  ) {}

  async create(orderItemData: any): Promise<OrderItem> {
    return this.orderItemModel.create(orderItemData);
  }

  async findAll(): Promise<OrderItem[]> {
    return this.orderItemModel.findAll();
  }

  async findOne(id: number): Promise<OrderItem> {
    return this.orderItemModel.findByPk(id);
  }

  async update(id: number, updateData: any): Promise<[number, OrderItem[]]> {
    return this.orderItemModel.update(updateData, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.orderItemModel.destroy({ where: { id } });
  }
}
