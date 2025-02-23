import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentService } from './payments.service';
import { Payment } from './payments.model';

@Module({
  imports: [SequelizeModule.forFeature([Payment])],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
