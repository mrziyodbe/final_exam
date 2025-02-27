import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/users/user.model';

@Table({ tableName: 'notifications' })
export class Notification extends Model<Notification> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  message: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isRead: boolean;

  @BelongsTo(() => User)
  user: User;
}
