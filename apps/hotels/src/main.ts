import { NestFactory } from '@nestjs/core';
import { HotelsModule } from './hotels.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(HotelsModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  await app.listen(process.env.HOTELS_SERVICE_PORT);
}
bootstrap();
