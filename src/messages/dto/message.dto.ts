import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class MessageDto {
  @ApiProperty({
    type: 'number',
    required: true,
  })
  id: number;
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
  @ApiProperty({
    type: 'string',
    format: 'date',
    required: true,
  })
  created_at: Date;
}
