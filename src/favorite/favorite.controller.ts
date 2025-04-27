import { Controller, Post, Body, Delete, UseGuards, Request, Query, Get } from '@nestjs/common'; // Importa Get
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { AuthMiddleware } from '../middleware/auth.middleware';

@Controller('favorite')
@UseGuards(AuthMiddleware)
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  async create(@Request() req, @Body() createFavoriteDto: CreateFavoriteDto) {
    const userId = req['user'].userId;
    return this.favoriteService.create(userId, createFavoriteDto);
  }

  @Delete()
  async removeByCityName(@Request() req, @Query('city') city: string): Promise<string[]> { 
    const userId = req['user'].userId;
    await this.favoriteService.removeByCity(userId, city); 
    return this.favoriteService.getUniqueFavoriteCities(userId); 
  }

  @Get('cities')
  async getMyUniqueFavoriteCities(@Request() req): Promise<string[]> {
    const userId = req['user'].userId;
    return this.favoriteService.getUniqueFavoriteCities(userId);
  }
}