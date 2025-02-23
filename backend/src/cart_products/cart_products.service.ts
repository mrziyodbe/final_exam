import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CartProduct } from './cart_products.model';
import { UpdateCartProductDto } from './dto/update-cart_product.dto';
import { CreateCartProductDto } from './dto/create-cart_product.dto';

@Injectable()
export class CartProductService {
  constructor(
    @InjectModel(CartProduct)
    private readonly cartProductModel: typeof CartProduct,
  ) {}

  async create(
    createCartProductDto: CreateCartProductDto,
  ): Promise<CartProduct> {
    return this.cartProductModel.create(createCartProductDto);
  }

  async findAll(): Promise<CartProduct[]> {
    return this.cartProductModel.findAll();
  }

  async findOne(id: number): Promise<CartProduct> {
    const cartProduct = await this.cartProductModel.findByPk(id);
    if (!cartProduct) throw new NotFoundException('Cart product not found');
    return cartProduct;
  }

  async update(
    id: number,
    updateCartProductDto: UpdateCartProductDto,
  ): Promise<CartProduct> {
    const cartProduct = await this.findOne(id);
    return cartProduct.update(updateCartProductDto);
  }

  async remove(id: number): Promise<void> {
    const cartProduct = await this.findOne(id);
    await cartProduct.destroy();
  }
}
