import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './carts.model';
import { CartProduct } from 'src/cart_products/cart_products.model';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart) private readonly cartModel: typeof Cart) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    return this.cartModel.create(createCartDto);
  }

  async findAll(): Promise<Cart[]> {
    return this.cartModel.findAll({ include: [CartProduct] });
  }

  async findOne(id: number): Promise<Cart> {
    const cart = await this.cartModel.findByPk(id, { include: [CartProduct] });
    if (!cart) throw new NotFoundException('Cart not found');
    return cart;
  }

  async update(id: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    const cart = await this.findOne(id);
    return cart.update(updateCartDto);
  }

  async remove(id: number): Promise<void> {
    const cart = await this.findOne(id);
    await cart.destroy();
  }
}
