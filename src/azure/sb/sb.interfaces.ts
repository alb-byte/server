import { ModuleMetadata, Type } from '@nestjs/common';

export type AzureSbOptions = {
  connectionString: string;
};

export interface AzureSbOptionsFactory {
  createMailchimpOptions(): Promise<AzureSbOptions> | AzureSbOptions;
}

export interface AzureSbAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<AzureSbOptionsFactory>;
  useClass?: Type<AzureSbOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<AzureSbOptions> | AzureSbOptions;
}
