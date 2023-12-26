import * as mongoose from 'mongoose';

export const ConfigSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: String, required: true },
});

export interface Config {
    key: string,
    value: string
}

export type ConfigDocument = Config & mongoose.Document;