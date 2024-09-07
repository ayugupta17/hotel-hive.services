/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class Payment extends Document {
  @Field((type) => ID)
  @Prop()
  id: string;
  @Field()
  @Prop()
  userId: string;
  @Field()
  @Prop()
  reservationId: string;
  @Field()
  @Prop()
  paymentMode: string;
  @Field()
  @Prop()
  paymentStatus: string;
  @Field()
  @Prop()
  paymentAmount: number;
  @Field()
  @Prop()
  transactionId: string;
  @Field()
  @Prop({ default: Date.now })
  createdOn: Date;
  @Field()
  @Prop({ default: Date.now })
  modifiedOn: Date;
}
export const PaymentSchema = SchemaFactory.createForClass(Payment);
