import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class MessageDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    required: true,
  })
  id: string;
  @ApiProperty({
    type: 'string',
    minLength: 3,
    maxLength: 30,
    example: 'Message text',
    required: true,
  })
  @Length(3, 30, {
    message: 'Text length must be 3 - 30  chars',
  })
  text: string;
}
