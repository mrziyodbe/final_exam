import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './payments.model';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment) private readonly paymentModel: typeof Payment,
  ) {}

  async createPayment(dto: CreatePaymentDto) {
    return this.paymentModel.create(dto);
  }

  async getAllPayments() {
    return this.paymentModel.findAll();
  }

  async getPaymentById(id: number) {
    return this.paymentModel.findOne({ where: { id } });
  }

  async updatePaymentStatus(id: number, dto: UpdatePaymentDto) {
    const payment = await this.getPaymentById(id);
    if (!payment) return null;

    payment.status = dto.status;
    return payment.save();
  }

  async deletePayment(id: number) {
    return this.paymentModel.destroy({ where: { id } });
  }
}
