import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { CartProduct } from 'src/cart_products/cart_products.model';
import { Category } from 'src/categories/categories.model';
import { Review } from 'src/review/review.model';
import { User } from 'src/users/user.model';

@Table({ tableName: 'products' })
export class Product extends Model<Product> {
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  sellerId: number;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: false })
  categoryId: number;

  @Column({ type: DataType.FLOAT, allowNull: false }) // Narxni FLOAT qilib olamiz
  price: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  approved: boolean;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;

  @Column({ type: DataType.DECIMAL(3, 2), allowNull: true, defaultValue: 0 })
  totalRating: number;

  @Column({ type: DataType.ARRAY(DataType.TEXT), allowNull: false })
  images: string[];

  // Bog‘lanishlar
  @BelongsTo(() => User, { onDelete: 'CASCADE' })
  seller: User;

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => Review)
  reviews: Review[];

  @HasMany(() => CartProduct)
  cartProducts: CartProduct[];
}
