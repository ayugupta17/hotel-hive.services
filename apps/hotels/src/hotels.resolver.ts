/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ResolveReference,
} from '@nestjs/graphql';
import { HotelsService } from './hotels.service';
import { Hotel } from './entities/hotel.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@app/common';
import { Room } from './entities/room.entity';
import { RoomsService } from './rooms/rooms.service';

@Resolver((of) => Hotel)
export class HotelsResolver {
  constructor(
    private hotelsService: HotelsService,
    private roomsService: RoomsService,
  ) {}
  @Query((returns) => [Hotel])
  @UseGuards(AuthGuard)
  hotels(): Promise<Hotel[]> {
    return this.hotelsService.findAll();
  }
  @Query((returns) => Hotel)
  @UseGuards(AuthGuard)
  hotel(@Args('id') id: string): Promise<Hotel> {
    return this.hotelsService.findOne(id);
  }
  @Mutation((returns) => Hotel)
  @UseGuards(AuthGuard)
  createHotel(
    @Args('name') name: string,
    @Args('type') type: string,
    @Args('starRating') starRating: number,
    @Args('location') location: string,
    @Args({ name: 'complimentary', type: () => [String] })
    complimentary: string[],
    @Args('description') description: string,
    @Args({ name: 'imageUrls', type: () => [String] }) imageUrls: string[],
    @Args('managerId') managerId: string,
    @Args({ name: 'amenities', type: () => [String] }) amenities: string[],
    @Args('rooms') rooms: number,
    @Args({ name: 'reviews', type: () => [String] }) reviews: string[],
  ): Promise<Hotel> {
    return this.hotelsService.create({
      name,
      type,
      starRating,
      location,
      complimentary,
      description,
      imageUrls,
      managerId,
      amenities,
      rooms,
      reviews,
    });
  }
  @Mutation((returns) => Hotel)
  @UseGuards(AuthGuard)
  updateHotel(
    @Args('id') id: string,
    @Args('name') name: string,
    @Args('type') type: string,
    @Args('starRating') starRating: number,
    @Args('location') location: string,
    @Args({ name: 'complimentary', type: () => [String] })
    complimentary: string[],
    @Args('description') description: string,
    @Args({ name: 'imageUrls', type: () => [String] }) imageUrls: string[],
    @Args('managerId') managerId: string,
    @Args({ name: 'amenities', type: () => [String] }) amenities: string[],
    @Args('rooms') rooms: number,
    @Args({ name: 'reviews', type: () => [String] }) reviews: string[],
  ): Promise<Hotel> {
    return this.hotelsService.update(id, {
      name,
      type,
      starRating,
      location,
      complimentary,
      description,
      imageUrls,
      managerId,
      amenities,
      rooms,
      reviews,
    });
  }
  @Mutation((returns) => Boolean)
  @UseGuards(AuthGuard)
  removeHotel(@Args('id') id: string): Promise<boolean> {
    return this.hotelsService.remove(id).then(() => true);
  }
  // @ResolveField('rooms', (returns) => [Room])
  // async getRooms(@Parent() hotel: Hotel): Promise<Room[]> {
  //   const { id } = hotel;
  //   return this.roomsService.findByHotelId(id);
  // }
  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: string;
  }): Promise<Hotel> {
    return this.hotelsService.findOne(reference.id);
  }
}
