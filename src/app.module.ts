import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AzureSbModule } from './azure/sb';
import configuration from './config/configuration';
import { Message } from './messages/entities/message.entity';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        ssl: true,
        entities: [Message],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AzureSbModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        connectionString: configService.get('SERVICEBUS_CONNECTION_STRING'),
      }),
      inject: [ConfigService],
    }),
    MessagesModule,
  ],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
