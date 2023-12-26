// src/config/config.controller.ts

import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ConfigService } from './config.service';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  async getConfig(@Query('key') key: string) {
    return await this.configService.get(key);
  }

  @Post()
  async addConfig(@Body('key') key: string, @Body('value') value: string) {
    return await this.configService.set(key, value);
  }

  @Put()
  async updateConfig(@Body('key') key: string, @Body('value') value: string) {
    return await this.configService.update(key, value);
  }
}
