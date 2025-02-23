import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Order } from 'src/orders/orders.model';
import { User } from '../users/user.model';

@Table({ tableName: 'payments' })
export class Payment extends Model<Payment> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER, allowNull: false })
  order_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    validate: { min: 0.01 }, // To‘lov miqdori 0 dan katta bo‘lishi kerak
  })
  amount: number;

  @Column({
    type: DataType.ENUM('pending', 'completed', 'failed'),
    allowNull: false,
    defaultValue: 'pending',
  })
  status: string;

  @Column({
    type: DataType.ENUM('click', 'payme', 'cash'),
    allowNull: false,
  })
  payment_method: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true, // Har bir to‘lov uchun unikal tranzaksiya ID
  })
  transaction_id: string;

  @BelongsTo(() => Order)
  order: Order;

  @BelongsTo(() => User)
  user: User;
}
