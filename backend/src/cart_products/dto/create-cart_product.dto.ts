import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateCartProductDto {
  @IsNotEmpty()
  @IsInt()
  cart_id: number;

  @IsNotEmpty()
  @IsInt()
  product_id: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;
}
