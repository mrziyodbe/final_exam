import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import { RemoveFavoriteDto } from './dto/remove-favorite.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('favorites')
@UseGuards(AuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  async addFavorite(@Request() req, @Body() dto: AddFavoriteDto) {
    return this.favoritesService.addFavorite(req.user.id, dto);
  }

  @Delete()
  async removeFavorite(@Request() req, @Body() dto: RemoveFavoriteDto) {
    return this.favoritesService.removeFavorite(req.user.id, dto);
  }

  @Get()
  async getUserFavorites(@Request() req) {
    return this.favoritesService.getUserFavorites(req.user.id);
  }
}
