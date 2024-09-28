export const awsConfig = {
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sqsQueueUrl: process.env.AWS_SQS_QUEUE_URL,
};
export const emailConfig = {
  smtpHost: process.env.SMTP_HOST,
  smtpPort: parseInt(process.env.SMTP_PORT, 10),
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
  fromEmail: process.env.FROM_EMAIL,
};
