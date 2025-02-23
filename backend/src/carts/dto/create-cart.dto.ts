import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsInt()
  user_id: number;
}
