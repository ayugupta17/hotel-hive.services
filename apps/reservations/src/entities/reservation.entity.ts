/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID, Directive } from '@nestjs/graphql';
import { Hotel, Payment, User } from '@app/common';

@ObjectType()
@Schema()
@Directive('@key(fields: "id")')
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
  @Field(() => Hotel)
  hotel?: Hotel;
  @Field(() => User)
  user?: User;
  @Field(() => Payment)
  payment?: Payment;
}
export const ReservationSchema = SchemaFactory.createForClass(Reservation);
