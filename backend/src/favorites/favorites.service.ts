import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Favorite } from './favorite.model';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import { RemoveFavoriteDto } from './dto/remove-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(@InjectModel(Favorite) private favoriteModel: typeof Favorite) {}

  async addFavorite(userId: number, dto: AddFavoriteDto) {
    const existing = await this.favoriteModel.findOne({
      where: { userId, productId: dto.productId },
    });

    if (existing) {
      return {
        success: false,
        message: 'Mahsulot allaqachon sevimlilarga qo‘shilgan',
      };
    }

    await this.favoriteModel.create({ userId, productId: dto.productId });
    return { success: true, message: 'Mahsulot sevimlilarga qo‘shildi' };
  }

  async removeFavorite(userId: number, dto: RemoveFavoriteDto) {
    const favorite = await this.favoriteModel.findOne({
      where: { userId, productId: dto.productId },
    });

    if (!favorite) {
      throw new NotFoundException('Mahsulot sevimlilarda mavjud emas');
    }

    await favorite.destroy();
    return { success: true, message: 'Mahsulot sevimlilardan o‘chirildi' };
  }

  async getUserFavorites(userId: number) {
    return this.favoriteModel.findAll({ where: { userId } });
  }
}
