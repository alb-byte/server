import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { QueueModule } from '../queue/queue.module';
import { AzureQueueService, QUEUE_SERVICE_KEY } from '../queue/queue.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), QueueModule],
  controllers: [MessagesController],
  providers: [
    MessagesService,
    {
      provide: QUEUE_SERVICE_KEY,
      useClass: AzureQueueService,
    },
  ],
})
export class MessagesModule {}
