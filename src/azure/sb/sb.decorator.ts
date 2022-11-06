import { Inject } from '@nestjs/common';
import { AZURE_SB_TOKEN } from './sb.constants';

export const InjectAzureNotificationHub = () => Inject(AZURE_SB_TOKEN);
