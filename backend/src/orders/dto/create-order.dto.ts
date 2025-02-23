import { IsEnum, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  total_price: number;

  @IsNotEmpty()
  @IsEnum(['pending', 'processing', 'delivered', 'cancelled'])
  status: string;

  @IsNotEmpty()
  @IsEnum(['click', 'payme', 'cash'])
  payment_method: string;
}
