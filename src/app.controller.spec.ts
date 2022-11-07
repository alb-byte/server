import { Test } from '@nestjs/testing';
import { AppService } from './app.service';

import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './app.module';
describe('AppController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      // .overrideProvider(AppService)
      // .useValue(appService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET status`, () => {
    return request(app.getHttpServer()).get('/status').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
