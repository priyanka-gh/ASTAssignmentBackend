import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

    async findAllSubscribed(): Promise<UserDocument[]> {
        return this.userModel.find({ isSubscribed: true, isBlocked: false }).exec();
    }

    async subscribeUser(telegramId: number, userName: string, fullName: string): Promise<UserDocument> {
        return this.userModel.findOneAndUpdate({ telegramId }, { isSubscribed: true, userName: userName, fullName: fullName }, { new: true, upsert: true }).exec();
    }

    async unsubscribeUser(telegramId: number): Promise<UserDocument> {
        return this.userModel.findOneAndUpdate({ telegramId }, { isSubscribed: false }, { new: true }).exec();
    }

    async findAllPaginated(page: number, pageSize: number): Promise<{ users: UserDocument[], total_users: number, total_pages: number }> {
        const skip = (page - 1) * pageSize;
      
        const users = await this.userModel
          .find()
          .skip(skip)
          .limit(pageSize)
          .select('-id -_v')
          .exec();
      
        const total_users = await this.userModel.countDocuments().exec();
      
        const total_pages = Math.ceil(total_users / pageSize);
      
        return {
          users,
          total_users,
          total_pages,
        };
    }

    async deleteUser(telegramId: number): Promise<UserDocument> {
        return this.userModel.findOneAndDelete({ telegramId }).exec();
    }
      
    async blockUser(telegramId: number): Promise<UserDocument> {
        return this.userModel.findOneAndUpdate({ telegramId }, { isBlocked: true }, { new: true }).exec();
    }
}
