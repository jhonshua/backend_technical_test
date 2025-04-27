import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  private readonly apiKey: string;
  private readonly apiUrl = 'http://api.weatherapi.com/v1';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const apiKey = this.configService.get<string>('API_KEY_WEATHER');
    if (!apiKey) {
      console.error('API_KEY_WEATHER is not defined in the .env file.');
      throw new Error('API Key for WeatherAPI is missing.');
    }
    this.apiKey = apiKey;
  }

  async getWeather(city: string): Promise<any> {
    const url = `${this.apiUrl}/current.json?key=${this.apiKey}&q=${city}`;
    try {
      const responseObservable = this.httpService.get<AxiosResponse>(url).pipe(map(res => res.data));
      return await firstValueFrom(responseObservable);
    } catch (error: any) {
      console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
      const errorData = error.response?.data || 'Failed to fetch weather data';
      const errorStatus = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(errorData, errorStatus);
    }
  }

  async autocompleteCity(query: string): Promise<any> {
    const url = `${this.apiUrl}/search.json?key=${this.apiKey}&q=${query}`;
    try {
      const responseObservable = this.httpService.get<AxiosResponse>(url).pipe(map(res => res.data));
      return await firstValueFrom(responseObservable);
    } catch (error: any) {
      console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
      const errorData = error.response?.data || 'Failed to fetch weather data';
      const errorStatus = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(errorData, errorStatus);
    }
  }
}