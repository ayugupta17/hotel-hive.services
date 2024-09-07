import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from './entities/payment.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
  ) {}
  async create(payment: Partial<Payment>): Promise<Payment> {
    const newPayment = new this.paymentModel({
      ...payment,
      id: uuidv4(),
      createdOn: new Date(),
      modifiedOn: new Date(),
    });
    return newPayment.save();
  }
  async findAll(): Promise<Payment[]> {
    return this.paymentModel.find().exec();
  }
  async findOne(id: string): Promise<Payment> {
    return this.paymentModel.findOne({ id }).exec();
  }
  async update(id: string, payment: Partial<Payment>): Promise<Payment> {
    return this.paymentModel
      .findOneAndUpdate({ id }, payment, { new: true })
      .exec();
  }
  async remove(id: string): Promise<void> {
    await this.paymentModel.deleteOne({ id }).exec();
  }
}
