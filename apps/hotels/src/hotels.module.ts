import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { HotelsService } from './hotels.service';
import { HotelsResolver } from './hotels.resolver';
import { Hotel, HotelSchema } from './entities/hotel.entity';
import { AuthModule, DatabaseModule, LoggerModule } from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { RoomsResolver } from './rooms/room.resolver';
import { RoomsService } from './rooms/rooms.service';
import { Room, RoomSchema } from './entities/room.entity';
import { CustomPrometheusModule, HealthModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule,
    AuthModule,
    DatabaseModule,
    CustomPrometheusModule,
    HealthModule,
    DatabaseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
      { name: Room.name, schema: RoomSchema },
    ]),
    LoggerModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      context: ({ req }) => {
        const token = req.headers.authorization?.split(' ')[1];
        return { token, req };
      },
    }),
  ],
  providers: [HotelsResolver, HotelsService, RoomsResolver, RoomsService],
})
export class HotelsModule {}
