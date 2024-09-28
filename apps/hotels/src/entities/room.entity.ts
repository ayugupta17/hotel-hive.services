/* eslint-disable @typescript-eslint/no-unused-vars */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';
@ObjectType()
@Schema()
export class Room extends Document {
  @Field((type) => ID)
  @Prop()
  id: string;
  @Field()
  @Prop()
  hotelId: string;
  @Field()
  @Prop()
  name: string;
  @Field()
  @Prop()
  price: number;
  @Field()
  @Prop()
  availableRooms: number;
  @Field((type) => [String])
  @Prop([String])
  roomAmenities: string[];
}
export const RoomSchema = SchemaFactory.createForClass(Room);
