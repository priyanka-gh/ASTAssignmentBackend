import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TelegramService } from 'src/telegram/telegram.service';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class WeatherService {

  private apiKey: string;

  constructor(
    private httpService: HttpService,
    private telegramService: TelegramService,
    private configService: ConfigService
  ) {
  }

  private async fetchWeatherData(): Promise<any> {
    this.apiKey = await this.configService.get('weatherApiKey');
    if (this.apiKey == null) {
      console.log('Can not fetch weather data, API key was not found');
      return;
    }
    const city = 'Ghaziabad';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`;

    try {
      const response = await firstValueFrom(this.httpService.get(url));
      console.log("Res", response);
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data', error);
      throw error;
    }
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    const weatherData = await this.fetchWeatherData();
    this.telegramService.sendWeatherDataToSubscribedUsers(weatherData);
  }
}
