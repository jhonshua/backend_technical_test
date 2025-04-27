import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'; 
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Favorite, FavoriteSchema } from './favorite.entity';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User, UserSchema } from '../auth/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Favorite.name, schema: FavoriteSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), 
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService, JwtService, ConfigService],
})
export class FavoriteModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(FavoriteController);
  }
}