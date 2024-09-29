import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { PaymentsService } from './payments.service';
import { PaymentsResolver } from './payments.resolver';
import { Payment, PaymentSchema } from './entities/payment.entity';
import { AuthModule, DatabaseModule, LoggerModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
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
    DatabaseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    DatabaseModule,
    LoggerModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      context: ({ req }) => {
        const token = req.headers.authorization?.split(' ')[1];
        return { token };
      },
    }),
  ],
  providers: [PaymentsResolver, PaymentsService],
})
export class PaymentsModule {}
