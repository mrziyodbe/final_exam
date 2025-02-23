import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { OrderItem } from 'src/order_items/order_items.model';
import { User } from 'src/users/user.model';
import { Payment } from 'src/payments/payments.model';

@Table({ tableName: 'orders' })
export class Order extends Model<Order> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  total_price: number;

  @Column({
    type: DataType.ENUM('pending', 'processing', 'delivered', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending',
  })
  status: string;

  @Column({ type: DataType.ENUM('click', 'payme', 'cash'), allowNull: false })
  payment_method: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => OrderItem)
  order_items: OrderItem[];

  @HasMany(() => Payment)
  payments: Payment[];
}
