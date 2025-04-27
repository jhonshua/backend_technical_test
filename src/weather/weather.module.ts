// src/weather/weather.module.ts
import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [WeatherController],
  providers: [WeatherService],
  exports: [WeatherService], 
})
export class WeatherModule {}