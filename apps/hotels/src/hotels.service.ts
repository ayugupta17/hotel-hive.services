import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel } from './entities/hotel.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class HotelsService {
  constructor(@InjectModel(Hotel.name) private hotelModel: Model<Hotel>) {}
  async create(hotel: Partial<Hotel>): Promise<Hotel> {
    const newHotel = new this.hotelModel({
      ...hotel,
      id: uuidv4(),
      createdOn: new Date(),
      modifiedOn: new Date(),
    });
    return newHotel.save();
  }
  async findAll(): Promise<Hotel[]> {
    return this.hotelModel.find().exec();
  }
  async findOne(id: string): Promise<Hotel> {
    return this.hotelModel.findOne({ id }).exec();
  }
  async update(id: string, hotel: Partial<Hotel>): Promise<Hotel> {
    return this.hotelModel
      .findOneAndUpdate({ id }, hotel, { new: true })
      .exec();
  }
  async remove(id: string): Promise<void> {
    await this.hotelModel.deleteOne({ id }).exec();
  }
}
