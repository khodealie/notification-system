import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppModule } from '../../src/app.module';

describe('Notification Flow (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    dataSource = moduleRef.get(DataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });

  it('/POST /notifications (queue)', async () => {
    const res = await request(app.getHttpServer())
      .post('/notifications')
      .send({
        channel: 'EMAIL',
        recipient: 'test@example.com',
        subject: 'Hi',
        content: {
          template: 'welcome',
          templateData: { name: 'John' },
        },
      })
      .expect(201);

    expect(res.body.id).toBeDefined();
  });
});
