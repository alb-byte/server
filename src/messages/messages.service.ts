import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueueService, QUEUE_SERVICE_KEY } from '../queue/queue.service';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageDto } from './dto/message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    @Inject(QUEUE_SERVICE_KEY) private queueService: QueueService,
  ) {}
  async create(createMessageDto: CreateMessageDto): Promise<MessageDto> {
    const message = new Message();
    message.text = createMessageDto.text;
    const savedMessage = await this.messagesRepository.save(message);
    await this.queueService.sendMessage(savedMessage);
    return savedMessage;
  }
  async findAll(): Promise<Array<MessageDto>> {
    const messages = await this.messagesRepository.find();
    return messages;
  }

  findOne(id: number): Promise<MessageDto> {
    return this.messagesRepository.findOneBy({ id });
  }

  async update(id: number, updateMessageDto: UpdateMessageDto): Promise<void> {
    this.messagesRepository.update({ id }, { text: updateMessageDto.text });
  }

  async remove(id: number): Promise<void> {
    this.messagesRepository.delete({ id });
  }
}
