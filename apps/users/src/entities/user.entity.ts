import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class User extends Document {
  @Field(() => ID)
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
