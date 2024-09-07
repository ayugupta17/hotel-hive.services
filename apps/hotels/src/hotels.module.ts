import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelsService } from './hotels.service';
import { HotelsResolver } from './hotels.resolver';
import { Hotel, HotelSchema } from './entities/hotel.entity';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL), // Replace with your MongoDB URI
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
  ],
  providers: [HotelsResolver, HotelsService],
})
export class HotelsModule {}
