import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdatePaymentDto {
  @IsNotEmpty()
  @IsEnum(['pending', 'completed', 'failed'])
  status: string;
}
