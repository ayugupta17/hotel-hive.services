/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RoomsService } from './rooms.service';
import { Room } from '../entities/room.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@app/common';

@Resolver((of) => Room)
export class RoomsResolver {
  constructor(private roomsService: RoomsService) {}
  @Query((returns) => [Room])
  @UseGuards(AuthGuard)
  rooms(): Promise<Room[]> {
    return this.roomsService.findAll();
  }
  @Query((returns) => Room)
  @UseGuards(AuthGuard)
  room(@Args('id') id: string): Promise<Room> {
    return this.roomsService.findOne(id);
  }
  @Mutation((returns) => Room)
  @UseGuards(AuthGuard)
  createRoom(
    @Args('hotelId') hotelId: string,
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('availableRooms') availableRooms: number,
    @Args({ name: 'roomAmenities', type: () => [String] })
    roomAmenities: string[],
  ): Promise<Room> {
    return this.roomsService.create({
      hotelId,
      name,
      price,
      availableRooms,
      roomAmenities,
    });
  }
  @Mutation((returns) => Room)
  @UseGuards(AuthGuard)
  updateRoom(
    @Args('id') id: string,
    @Args('hotelId') hotelId: string,
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('availableRooms') availableRooms: number,
    @Args({ name: 'roomAmenities', type: () => [String] })
    roomAmenities: string[],
  ): Promise<Room> {
    return this.roomsService.update(id, {
      hotelId,
      name,
      price,
      availableRooms,
      roomAmenities,
    });
  }
  @Mutation((returns) => Boolean)
  @UseGuards(AuthGuard)
  removeRoom(@Args('id') id: string): Promise<boolean> {
    return this.roomsService.remove(id).then(() => true);
  }
}
