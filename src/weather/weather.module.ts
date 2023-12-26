import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TelegramModule } from '../telegram/telegram.module'; // Adjust the path as necessary
import { WeatherService } from './weather.service';
import { ConfigModule } from '../config/config.module'; // Adjust the path as necessary

@Module({
  imports: [HttpModule, TelegramModule, ConfigModule], // Import TelegramModule here
  providers: [WeatherService],
})
export class WeatherModule {}
