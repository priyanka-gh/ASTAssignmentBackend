import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { UsersModule } from '../users/users.module'; // Adjust the path as necessary

@Module({
  imports: [UsersModule], // Import UsersModule here
  providers: [TelegramService],
  exports: [TelegramService]

})
export class TelegramModule {}
