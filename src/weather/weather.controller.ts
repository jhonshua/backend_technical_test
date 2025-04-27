// src/weather/weather.controller.ts
import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { IsNotEmpty, IsString } from 'class-validator';

class GetWeatherDto {
  @IsNotEmpty()
  @IsString()
  city: string;
}

class AutocompleteQueryDto {
  @IsNotEmpty()
  @IsString()
  query: string;
}

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(@Query(new ValidationPipe()) query: GetWeatherDto): 
  Promise<any> {
    return this.weatherService.getWeather(query.city);
  }

  @Get('autocomplete')
  async autocomplete(@Query(new ValidationPipe()) query: AutocompleteQueryDto): Promise<any> {
    return this.weatherService.autocompleteCity(query.query);
  }
}