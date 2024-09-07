/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PaymentsService } from './payments.service';
import { Payment } from './entities/payment.entity';

@Resolver((of) => Payment)
export class PaymentsResolver {
  constructor(private paymentsService: PaymentsService) {}
  @Query((returns) => [Payment])
  payments(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }
  @Query((returns) => Payment)
  payment(@Args('id') id: string): Promise<Payment> {
    return this.paymentsService.findOne(id);
  }
  @Mutation((returns) => Payment)
  createPayment(
    @Args('userId') userId: string,
    @Args('reservationId') reservationId: string,
    @Args('paymentMode') paymentMode: string,
    @Args('paymentStatus') paymentStatus: string,
    @Args('paymentAmount') paymentAmount: number,
    @Args('transactionId') transactionId: string,
  ): Promise<Payment> {
    return this.paymentsService.create({
      userId,
      reservationId,
      paymentMode,
      paymentStatus,
      paymentAmount,
      transactionId,
    });
  }
  @Mutation((returns) => Payment)
  updatePayment(
    @Args('id') id: string,
    @Args('userId') userId: string,
    @Args('reservationId') reservationId: string,
    @Args('paymentMode') paymentMode: string,
    @Args('paymentStatus') paymentStatus: string,
    @Args('paymentAmount') paymentAmount: number,
    @Args('transactionId') transactionId: string,
  ): Promise<Payment> {
    return this.paymentsService.update(id, {
      userId,
      reservationId,
      paymentMode,
      paymentStatus,
      paymentAmount,
      transactionId,
    });
  }
  @Mutation((returns) => Boolean)
  removePayment(@Args('id') id: string): Promise<boolean> {
    return this.paymentsService.remove(id).then(() => true);
  }
}
