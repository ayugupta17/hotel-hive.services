import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  await app.listen(process.env.NOTIFICATIONS_SERVICE_PORT);
}
bootstrap();
