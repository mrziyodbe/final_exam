import { IsEnum, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export enum PaymentMethod {
  CLICK = 'click',
  PAYME = 'payme',
  CASH = 'cash',
}

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @IsNotEmpty()
  @IsInt()
  order_id: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;
}
