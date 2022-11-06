import { Test } from '@nestjs/testing';
import { AppService } from './app.service';

import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './app.module';
describe('AppController', () => {
  let app: INestApplication;
  const payload = {
    text: 'Hello World!!!',
  };
  const appService = { createMessage: () => {} };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AppService)
      .useValue(appService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST app`, () => {
    return request(app.getHttpServer()).post('/').send(payload).expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
