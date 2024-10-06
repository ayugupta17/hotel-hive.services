/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
} from '@nestjs/graphql';
import { PaymentsService } from './payments.service';
import { Payment } from './entities/payment.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@app/common';

@Resolver((of) => Payment)
export class PaymentsResolver {
  constructor(private paymentsService: PaymentsService) {}
  @Query((returns) => [Payment])
  @UseGuards(AuthGuard)
  payments(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }
  @Query((returns) => Payment)
  @UseGuards(AuthGuard)
  payment(@Args('id') id: string): Promise<Payment> {
    return this.paymentsService.findOne(id);
  }
  @Mutation((returns) => Payment)
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  removePayment(@Args('id') id: string): Promise<boolean> {
    return this.paymentsService.remove(id).then(() => true);
  }
  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: string;
  }): Promise<Payment> {
    return this.paymentsService.findOne(reference.id);
  }
}
