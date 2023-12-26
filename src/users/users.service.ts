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

    async findAllPaginated(page: number, pageSize: number): Promise<UserDocument[]> {
        const skip = (page - 1) * pageSize;
        return this.userModel
            .find()
            .skip(skip)
            .limit(pageSize)
            .select('-_id -__v')
            .exec();
    }

    async findAllUsers(): Promise<UserDocument[]> {
        return this.userModel.find().select('-_id -__v').exec();
    }    

    async deleteUser(telegramId: number): Promise<UserDocument> {
        return this.userModel.findOneAndDelete({ telegramId }).exec();
    }
      
    async blockUser(telegramId: number): Promise<UserDocument> {
        return this.userModel.findOneAndUpdate({ telegramId }, { isBlocked: true }, { new: true }).exec();
    }
}
