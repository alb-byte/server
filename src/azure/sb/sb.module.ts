import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { AZURE_SB_OPTIONS, AZURE_SB_TOKEN } from './sb.constants';
import {
  AzureSbAsyncOptions,
  AzureSbOptions,
  AzureSbOptionsFactory,
} from './sb.interfaces';
import { AzureSbService } from './sb.service';

export const connectionFactory = {
  provide: AZURE_SB_TOKEN,
  useFactory: (azureSbService) => azureSbService.instance(),
  inject: [AzureSbService],
};

@Global()
@Module({
  providers: [connectionFactory, AzureSbService],
  exports: [connectionFactory, AzureSbService],
})
export class AzureSbModule {
  /**
   * Registers a configured Mailchimp Module for import into the current module
   */
  public static forRoot(options: AzureSbOptions): DynamicModule {
    return {
      module: AzureSbModule,
      providers: [{ provide: AZURE_SB_OPTIONS, useValue: options }],
    };
  }

  /**
   * Registers a configured Mailchimp Module for import into the current module
   * using dynamic options (factory, etc)
   */
  public static forRootAsync(options: AzureSbAsyncOptions): DynamicModule {
    return {
      module: AzureSbModule,
      imports: options.imports ?? [],
      providers: [...this.createProviders(options)],
    };
  }

  private static createProviders(options: AzureSbAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createOptionsProvider(options)];
    }

    return [
      this.createOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createOptionsProvider(options: AzureSbAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: AZURE_SB_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: AZURE_SB_OPTIONS,
      useFactory: async (optionsFactory: AzureSbOptionsFactory) =>
        await optionsFactory.createMailchimpOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
