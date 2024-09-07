import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(user: Partial<User>): Promise<User> {
    const newUser = new this.userModel({
      ...user,
      id: uuidv4(),
      createdOn: new Date(),
      modifiedOn: new Date(),
    });
    return newUser.save();
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ id }).exec();
  }
  async update(id: string, user: Partial<User>): Promise<User> {
    return this.userModel.findOneAndUpdate({ id }, user, { new: true }).exec();
  }
  async remove(id: string): Promise<void> {
    await this.userModel.deleteOne({ id }).exec();
  }
}
