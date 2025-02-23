import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Injectable } from '@nestjs/common';

@Injectable()
@Table({ tableName: 'notifications', timestamps: false })
export class Notification extends Model {
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @Column
  message: string;

  @Column({ defaultValue: false })
  is_read: boolean;

  @Column({ defaultValue: new Date() })
  created_at: Date;

  @BelongsTo(() => User)
  user: User;
}
