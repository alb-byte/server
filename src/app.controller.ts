import { Controller, Get, HttpCode, Logger } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
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
  healthCheck(): string {
    this.logger.log('health check');
    return 'Ok';
  }
}
