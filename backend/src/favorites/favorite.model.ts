import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/user.model';
import { Product } from 'src/products/products.model';

@Table({ tableName: 'favorites' })
export class Favorite extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Product)
  @Column
  productId: number;
}
