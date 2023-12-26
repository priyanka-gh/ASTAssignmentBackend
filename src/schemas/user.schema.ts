import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  telegramId: { type: Number, required: true, unique: true },
  userName: { type: String, required: false},
  fullName: { type: String, required: true},
  isSubscribed: { type: Boolean, required: true, default: false },
  isBlocked: { type: Boolean, required: true, default: false },
});

// Interface for the user schema
export interface User {
  telegramId: number;
  isSubscribed: boolean;
  isBlocked: boolean
}

// Mongoose document type for User, combining both the mongoose.Document and the User interface
export type UserDocument = User & mongoose.Document;
