// src/config/config.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigDocument } from 'src/schemas/config.schema';

@Injectable()
export class ConfigService {
  constructor(@InjectModel('Config') private configModel: Model<ConfigDocument>) {}

  async get(key: string): Promise<string> {
    const config = await this.configModel.findOne({ key }).exec();
    return config ? config.value : null;
  }

  async set(key: string, value: string): Promise<ConfigDocument> {
    const newConfig = new this.configModel({ key, value });
    return newConfig.save();
  }

  async update(key: string, value: string): Promise<ConfigDocument> {
    return this.configModel.findOneAndUpdate({ key }, { value }, { new: true }).exec();
  }
}
