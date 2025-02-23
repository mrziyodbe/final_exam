import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Cart } from 'src/carts/carts.model';
import { Product } from 'src/products/products.model';

@Table({ tableName: 'cart_products' })
export class CartProduct extends Model<CartProduct> {
  @ForeignKey(() => Cart)
  @Column({ type: DataType.INTEGER, allowNull: false })
  cart_id: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  product_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
  quantity: number;

  @BelongsTo(() => Cart)
  cart: Cart;

  @BelongsTo(() => Product)
  product: Product;
}
