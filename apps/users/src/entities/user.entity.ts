/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID, Directive } from '@nestjs/graphql';

@ObjectType()
@Schema()
@Directive('@key(fields: "id")')
export class User extends Document {
  @Field((type) => ID)
  @Prop()
  id: string;
  @Field()
  @Prop()
  name: string;
  @Field()
  @Prop()
  email: string;
  @Field()
  @Prop()
  password: string;
  @Field()
  @Prop()
  dob: Date;
  @Field()
  @Prop({ default: Date.now })
  createdOn: Date;
  @Field()
  @Prop({ default: Date.now })
  modifiedOn: Date;
  @Field()
  @Prop()
  roleId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
