import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite, FavoriteDocument } from './favorite.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { User } from '../auth/entities/user.entity'; // Import User

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(Favorite.name) private readonly favoriteModel: Model<FavoriteDocument>,
    @InjectModel(User.name) private readonly userModel: Model<User>, 
  ) {}

  async create(userId: string, createFavoriteDto: CreateFavoriteDto): Promise<FavoriteDocument> {
    const user = await this.userModel.findById(userId).orFail(new NotFoundException(`User with ID "${userId}" not found`)).exec();
    const favorite = new this.favoriteModel({ ...createFavoriteDto, user: userId });
    return favorite.save();
  }

  async removeByCity(userId: string, city: string): Promise<void> {
    const result = await this.favoriteModel.deleteOne({ user: userId, city: city }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`La ciudad "${city}" no se encontró en tus favoritos.`);
    }
  }

  async getUniqueFavoriteCities(userId: string): Promise<string[]> {
    const favorites = await this.favoriteModel.find({ user: userId }).distinct('city').exec();
    return favorites;
  }
}