/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class Hotel extends Document {
  @Field((type) => ID)
  @Prop()
  id: string;
  @Field()
  @Prop()
  name: string;
  @Field()
  @Prop()
  type: string;
  @Field()
  @Prop()
  starRating: number;
  @Field()
  @Prop()
  location: string;
  @Field((type) => [String])
  @Prop([String])
  complimentary: string[];
  @Field()
  @Prop()
  description: string;
  @Field((type) => [String])
  @Prop([String])
  imageUrls: string[];
  @Field()
  @Prop()
  managerId: string;
  @Field((type) => [String])
  @Prop([String])
  amenities: string[];
  @Field((type) => Number)
  @Prop()
  rooms: number;
  @Field((type) => [String])
  @Prop([String])
  reviews: string[];
  @Field()
  @Prop({ default: Date.now })
  createdOn: Date;
  @Field()
  @Prop({ default: Date.now })
  modifiedOn: Date;
}
export const HotelSchema = SchemaFactory.createForClass(Hotel);
