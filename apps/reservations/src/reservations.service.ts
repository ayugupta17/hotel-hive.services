import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from './entities/reservation.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
  ) {}
  async create(reservation: Partial<Reservation>): Promise<Reservation> {
    const newReservation = new this.reservationModel({
      ...reservation,
      id: uuidv4(),
      createdOn: new Date(),
      modifiedOn: new Date(),
    });
    return newReservation.save();
  }
  async findAll(): Promise<Reservation[]> {
    return this.reservationModel.find().exec();
  }
  async findOne(id: string): Promise<Reservation> {
    return this.reservationModel.findOne({ id }).exec();
  }
  async update(
    id: string,
    reservation: Partial<Reservation>,
  ): Promise<Reservation> {
    return this.reservationModel
      .findOneAndUpdate({ id }, reservation, { new: true })
      .exec();
  }
  async remove(id: string): Promise<void> {
    await this.reservationModel.deleteOne({ id }).exec();
  }
  async findAllByUser(userId: string): Promise<Reservation[]> {
    return this.reservationModel.find({ userId }).exec();
  }
  async findOneByUser(id: string, userId: string): Promise<Reservation> {
    return this.reservationModel.findOne({ id, userId }).exec();
  }
}
