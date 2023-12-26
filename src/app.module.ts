import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TelegramModule } from './telegram/telegram.module';
import { UsersModule } from './users/users.module';
import { WeatherModule } from './weather/weather.module';
import { ConfigModule } from './config/config.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://priyankaghanselaa:abcd123@cluster0.5juypze.mongodb.net/?retryWrites=true&w=majority'),
    TelegramModule,
    UsersModule,
    WeatherModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
