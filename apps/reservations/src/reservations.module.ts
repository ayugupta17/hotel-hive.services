import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationsService } from './reservations.service';
import { ReservationsResolver } from './reservations.resolver';
import { Reservation, ReservationSchema } from './entities/reservation.entity';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://usersdb:usersdb@0.0.0.0:7001'), // Replace with your MongoDB URI
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
  ],
  providers: [ReservationsResolver, ReservationsService],
})
export class ReservationsModule {}
