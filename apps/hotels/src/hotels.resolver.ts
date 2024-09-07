/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HotelsService } from './hotels.service';
import { Hotel } from './entities/hotel.entity';

@Resolver((of) => Hotel)
export class HotelsResolver {
  constructor(private hotelsService: HotelsService) {}
  @Query((returns) => [Hotel])
  hotels(): Promise<Hotel[]> {
    return this.hotelsService.findAll();
  }
  @Query((returns) => Hotel)
  hotel(@Args('id') id: string): Promise<Hotel> {
    return this.hotelsService.findOne(id);
  }
  @Mutation((returns) => Hotel)
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
  removeHotel(@Args('id') id: string): Promise<boolean> {
    return this.hotelsService.remove(id).then(() => true);
  }
}
