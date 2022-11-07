import { ServiceBusClient, ServiceBusMessage } from '@azure/service-bus';
import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { InjectAzureNotificationHub } from '../azure/sb';

export const QUEUE_SERVICE_KEY = 'QueueService';
export interface QueueService {
  sendMessage(message: any);
}
@Injectable()
export class AzureQueueService implements QueueService {
  private readonly logger = new Logger(AzureQueueService.name);
  constructor(
    @InjectAzureNotificationHub()
    private readonly sbConnection: ServiceBusClient,
  ) {}
  async sendMessage(messageBody: any) {
    const sender = this.sbConnection.createSender('test');
    const message: ServiceBusMessage = {
      body: messageBody,
      messageId: randomUUID(),
      contentType: 'application/json',
    };
    await sender.sendMessages(message);
    this.logger.log('send message: ' + JSON.stringify(message.body));
  }
}
