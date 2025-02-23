import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/user.model';
import { CartProduct } from 'src/cart_products/cart_products.model';

@Table({ tableName: 'carts' })
export class Cart extends Model<Cart> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => CartProduct)
  cart_products: CartProduct[];
}
