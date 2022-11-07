import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageDto } from './dto/message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagesService } from './messages.service';

@ApiTags('Messages')
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('messages')
export class MessagesController {
  private readonly logger = new Logger(MessagesController.name);
  constructor(private readonly messagesService: MessagesService) {}

  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiCreatedResponse({
    description: 'Create message',
    type: CreateMessageDto,
  })
  @HttpCode(201)
  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    this.logger.log('create message: ' + createMessageDto.text);
    return this.messagesService.create(createMessageDto);
  }

  @ApiOkResponse({
    description: 'Get all messages ',
    type: Array<MessageDto>,
  })
  @Get()
  findAll() {
    this.logger.log('get messages');
    return this.messagesService.findAll();
  }

  @ApiOkResponse({
    description: 'Get message ',
    type: MessageDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log('get message: ' + id);
    return this.messagesService.findOne(+id);
  }

  @HttpCode(204)
  @ApiNoContentResponse({
    description: 'The message has been successfully updated.',
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    this.logger.log('update message: ' + updateMessageDto.text);
    return this.messagesService.update(+id, updateMessageDto);
  }

  @HttpCode(204)
  @ApiNoContentResponse({
    description: 'The message has been successfully removed.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log('remove message: ' + id);
    return this.messagesService.remove(+id);
  }
}
