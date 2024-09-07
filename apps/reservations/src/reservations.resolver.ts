/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReservationsService } from './reservations.service';
import { Reservation } from './entities/reservation.entity';

@Resolver((of) => Reservation)
export class ReservationsResolver {
  constructor(private reservationsService: ReservationsService) {}
  @Query((returns) => [Reservation])
  reservations(): Promise<Reservation[]> {
    return this.reservationsService.findAll();
  }
  @Query((returns) => Reservation)
  reservation(@Args('id') id: string): Promise<Reservation> {
    return this.reservationsService.findOne(id);
  }
  @Mutation((returns) => Reservation)
  createReservation(
    @Args('userId') userId: string,
    @Args('hotelId') hotelId: string,
    @Args('rooms') rooms: number,
    @Args('bookingAmount') bookingAmount: number,
    @Args('paymentId') paymentId: string,
    @Args('paymentStatus') paymentStatus: string,
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
    @Args('additionalGuests') additionalGuests: number,
  ): Promise<Reservation> {
    return this.reservationsService.create({
      userId,
      hotelId,
      rooms,
      bookingAmount,
      paymentId,
      paymentStatus,
      startDate,
      endDate,
      additionalGuests,
    });
  }
  @Mutation((returns) => Reservation)
  updateReservation(
    @Args('id') id: string,
    @Args('userId') userId: string,
    @Args('hotelId') hotelId: string,
    @Args('rooms') rooms: number,
    @Args('bookingAmount') bookingAmount: number,
    @Args('paymentId') paymentId: string,
    @Args('paymentStatus') paymentStatus: string,
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
    @Args('additionalGuests') additionalGuests: number,
  ): Promise<Reservation> {
    return this.reservationsService.update(id, {
      userId,
      hotelId,
      rooms,
      bookingAmount,
      paymentId,
      paymentStatus,
      startDate,
      endDate,
      additionalGuests,
    });
  }
  @Mutation((returns) => Boolean)
  removeReservation(@Args('id') id: string): Promise<boolean> {
    return this.reservationsService.remove(id).then(() => true);
  }
}
