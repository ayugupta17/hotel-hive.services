import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { PrometheusController } from './prometheus.controller';
import { PrometheusMiddleware } from './prometheus.middleware';

@Module({
  controllers: [PrometheusController],
})
export class PrometheusModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PrometheusMiddleware).forRoutes('*');
  }
}
