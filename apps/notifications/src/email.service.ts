import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
@Injectable()
export class EmailService {
  private readonly transporter: nodemailer.Transporter;
  private readonly fromEmail: string;
  private readonly logger = new Logger(EmailService.name);
  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('email.smtpHost'),
      port: this.configService.get<number>('email.smtpPort'),
      secure: false,
      auth: {
        user: this.configService.get<string>('email.smtpUser'),
        pass: this.configService.get<string>('email.smtpPass'),
      },
    });
    this.fromEmail = this.configService.get<string>('email.fromEmail');
  }
  async sendEmail(data: { to: string; subject: string; text: string }) {
    try {
      const info = await this.transporter.sendMail({
        from: this.fromEmail,
        to: data.to,
        subject: data.subject,
        text: data.text,
      });
      this.logger.log(`Email sent: ${info.messageId}`);
    } catch (error) {
      this.logger.error('Error sending email', error);
    }
  }
}
