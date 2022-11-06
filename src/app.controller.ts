import { Body, Controller, Get, HttpCode, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageDto } from './dto/message.dto';
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @ApiTags('HealthCheck')
  @Get('/status')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'HealthCheck',
  })
  healthCheck(): void {
    this.logger.log('health check');
    return;
  }

  @ApiTags('App')
  @Post('/')
  @HttpCode(201)
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiCreatedResponse({
    description: 'Create message',
  })
  createMessage(
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<MessageDto> {
    this.logger.log('create message: ' + createMessageDto.text);
    return this.appService.createMessage(createMessageDto);
  }
}
