import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageDto } from './dto/message.dto';
import { randomUUID } from 'crypto';
@Injectable()
export class AppService {
  async createMessage(dto: CreateMessageDto): Promise<MessageDto> {
    return {
      id: randomUUID(),
      text: dto.text,
    };
  }
}
