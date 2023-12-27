import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
    private readonly bot = new Telegraf(process.env.TELEGRAM_TOKEN);

    constructor(private usersService: UsersService) {
        this.initializeBot();
    }

    private initializeBot() {
        this.bot.start((ctx) => ctx.reply('Welcome! Use /subscribe to get daily weather updates.'));

        this.bot.command('subscribe', async (ctx) => {
            const chatId = ctx.message.chat.id;
            const firstName = ctx.message.from.first_name;
            const lastName = ctx.message.from.last_name || '';
            const userName = ctx.message.from.username || '';
            const fullName = `${firstName} ${lastName}`.trim();
            try {
                await this.usersService.subscribeUser(chatId, userName, fullName);
                ctx.reply(`Hello ${fullName}, you have subscribed to daily weather updates.`);
            } catch (error) {
                ctx.reply('An error occurred while subscribing.');
                console.error(error);
            }
        });

        this.bot.command('unsubscribe', async (ctx) => {
            const chatId = ctx.message.chat.id;
            try {
                await this.usersService.unsubscribeUser(chatId);
                ctx.reply('You have unsubscribed from daily weather updates.');
            } catch (error) {
                ctx.reply('An error occurred while unsubscribing.');
                console.error(error);
            }
        });
          
        this.bot.launch();
    }
      
    async sendWeatherDataToSubscribedUsers(weatherData: any) {
        const subscribedUsers = await this.usersService.findAllSubscribed();
        const message = this.formatWeatherMessage(weatherData);
        subscribedUsers.forEach((user) => {
            this.bot.telegram.sendMessage(user.telegramId, message);
        });
        console.log(message);
    }

    private formatWeatherMessage(weatherData: any): string {
        // Convert temperature from Kelvin to Celsius and Fahrenheit
        const tempInCelsius = weatherData.main.temp - 273.15;
        const tempInFahrenheit = (weatherData.main.temp - 273.15) * (9 / 5) + 32;
      
        return `Weather Update: \nCity: ${weatherData.name} \nTemperature: ${tempInCelsius.toFixed(1)}°C / ${tempInFahrenheit.toFixed(1)}°F \nWeather: ${weatherData.weather[0].main}`;
    }
      
}
