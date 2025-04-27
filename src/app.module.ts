import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelpController } from './help/help.controller'; 
import { DatabaseModule } from './database/database.module'; 
import { resolve } from 'path';
import { AuthModule } from './auth/auth.module';
import { WeatherModule } from './weather/weather.module';
import { FavoriteModule } from './favorite/favorite.module';

const envFilePath = resolve(__dirname, '../.env');

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    WeatherModule,
    FavoriteModule,
  ],
  controllers: [AppController, HelpController],
  providers: [AppService],
})
export class AppModule {}




