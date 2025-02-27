import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  seller_id: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  category_id: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  approved?: boolean;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  quantity: number;

  @IsOptional()
  @Type(() => Number)
  totalrating?: number;

  @IsArray()
  @IsNotEmpty()
  images: string[];
}
