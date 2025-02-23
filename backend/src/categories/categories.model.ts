import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Product } from 'src/products/products.model';

@Table({ tableName: 'categories' })
export class Category extends Model<Category> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: { isUrl: true },
  })
  imageUrl: string;

  @HasMany(() => Product)
  products: Product[];
}
