import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import {
  SQSClient,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} from '@aws-sdk/client-sqs';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
@Injectable()
export class SqsService implements OnModuleInit {
  private readonly sqsClient: SQSClient;
  private readonly sqsQueueUrl: string;
  private readonly logger = new Logger(SqsService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {
    this.sqsClient = new SQSClient({
      region: this.configService.get<string>('aws.region'),
      credentials: {
        accessKeyId: this.configService.get<string>('aws.accessKeyId'),
        secretAccessKey: this.configService.get<string>('aws.secretAccessKey'),
      },
    });
    this.sqsQueueUrl = this.configService.get<string>('aws.sqsQueueUrl');
  }
  async onModuleInit() {
    this.pollMessages();
  }
  async pollMessages() {
    while (true) {
      try {
        const command = new ReceiveMessageCommand({
          QueueUrl: this.sqsQueueUrl,
          MaxNumberOfMessages: 10,
          WaitTimeSeconds: 20,
        });
        const response = await this.sqsClient.send(command);
        if (response.Messages) {
          for (const message of response.Messages) {
            await this.handleMessage(message);
            await this.deleteMessage(message.ReceiptHandle);
          }
        }
      } catch (error) {
        this.logger.error('Error receiving messages from SQS', error);
      }
    }
  }
  async handleMessage(message: any) {
    const body = JSON.parse(message.Body);
    await this.emailService.sendEmail(body);
  }
  async deleteMessage(receiptHandle: string) {
    const command = new DeleteMessageCommand({
      QueueUrl: this.sqsQueueUrl,
      ReceiptHandle: receiptHandle,
    });
    await this.sqsClient.send(command);
  }
}
