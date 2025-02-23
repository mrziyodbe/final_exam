import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/products/products.model';
import { User } from 'src/users/user.model';

@Table({ tableName: 'reviews' })
export class Review extends Model<Review> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId: number;

  @Column({
    type: DataType.DECIMAL(2, 1),
    allowNull: false,
    validate: {
      min: 0,
      max: 5,
    },
  })
  rating: number;

  @Column({ type: DataType.TEXT, allowNull: true })
  comment: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Product)
  product: Product;
}
