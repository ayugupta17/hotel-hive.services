/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class Reservation extends Document {
  @Field((type) => ID)
  @Prop()
  id: string;
  @Field()
  @Prop()
  userId: string;
  @Field()
  @Prop()
  hotelId: string;
  @Field()
  @Prop()
  rooms: number;
  @Field()
  @Prop()
  bookingAmount: number;
  @Field()
  @Prop()
  paymentId: string;
  @Field()
  @Prop()
  paymentStatus: string;
  @Field()
  @Prop()
  startDate: Date;
  @Field()
  @Prop()
  endDate: Date;
  @Field()
  @Prop()
  additionalGuests: number;
  @Field()
  @Prop({ default: Date.now })
  createdOn: Date;
  @Field()
  @Prop({ default: Date.now })
  modifiedOn: Date;
}
export const ReservationSchema = SchemaFactory.createForClass(Reservation);
