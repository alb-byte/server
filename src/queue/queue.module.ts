import { Module } from '@nestjs/common';
import { AzureQueueService } from './queue.service';

@Module({
  providers: [AzureQueueService],
  exports: [AzureQueueService],
})
export class QueueModule {}
