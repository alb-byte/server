import { ServiceBusClient } from '@azure/service-bus';
import { Inject, Injectable } from '@nestjs/common';
import { AZURE_SB_OPTIONS } from './sb.constants';
import { AzureSbOptions } from './sb.interfaces';

export interface IAzureNotificationHubService {
  instance(): ServiceBusClient;
}

@Injectable()
export class AzureSbService implements IAzureNotificationHubService {
  private sbClient: ServiceBusClient;

  constructor(
    @Inject(AZURE_SB_OPTIONS)
    private options: AzureSbOptions,
  ) {
    this.sbClient = new ServiceBusClient(options.connectionString);
  }

  instance(): ServiceBusClient {
    if (!this.sbClient)
      this.sbClient = new ServiceBusClient(this.options.connectionString);

    return this.sbClient;
  }
}
