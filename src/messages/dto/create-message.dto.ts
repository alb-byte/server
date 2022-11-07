import { OmitType } from '@nestjs/swagger';
import { MessageDto } from './message.dto';

export class CreateMessageDto extends OmitType(MessageDto, [
  'id',
  'created_at',
] as const) {}
