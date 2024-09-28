import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from '../entities/room.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}
  async create(room: Partial<Room>): Promise<Room> {
    const newRoom = new this.roomModel({
      ...room,
      id: uuidv4(),
    });
    return newRoom.save();
  }
  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }
  async findOne(id: string): Promise<Room> {
    return this.roomModel.findOne({ id }).exec();
  }
  async update(id: string, room: Partial<Room>): Promise<Room> {
    return this.roomModel.findOneAndUpdate({ id }, room, { new: true }).exec();
  }
  async remove(id: string): Promise<void> {
    await this.roomModel.deleteOne({ id }).exec();
  }
  async findByHotelId(hotelId: string): Promise<Room[]> {
    return this.roomModel.find({ hotelId }).exec();
  }
}
