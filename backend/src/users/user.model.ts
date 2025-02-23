import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Role } from '../common/roles';
import { Product } from 'src/products/products.model';
import { Review } from 'src/review/review.model';
import { Order } from 'src/orders/orders.model';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @Column({ unique: true, type: DataType.STRING, allowNull: false })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: { len: [6, 100] },
  })
  password: string;

  @Column({
    type: DataType.ENUM(Role.USER, Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN),
    allowNull: false,
  })
  role: Role;

  @Column({
    unique: true,
    type: DataType.STRING(13),
    allowNull: false,
    validate: { isNumeric: false, len: [13, 13] },
  })
  phone: string;

  @Column({
    type: DataType.ENUM('male', 'female'),
    allowNull: true,
  })
  gender: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    validate: { min: 12, max: 100 },
  })
  age: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isApproved: boolean;

  @HasMany(() => Product)
  products: Product[];

  @HasMany(() => Review)
  reviews: Review[];

  @HasMany(() => Order)
  orders: Order[];
}
