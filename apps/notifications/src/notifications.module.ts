import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationsService } from './notifications.service';
import { EmailService } from './email.service';
import { SqsService } from './sqs.service';
import { awsConfig, emailConfig } from './config/config';
import { LoggerModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => ({ aws: awsConfig, email: emailConfig })],
    }),
    ScheduleModule.forRoot(),
    LoggerModule,
  ],
  providers: [NotificationsService, EmailService, SqsService],
})
export class NotificationsModule {}
