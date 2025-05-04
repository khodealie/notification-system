import { DataSource } from 'typeorm';
import { Notification } from '../cores/notification-core/entities/notification.entity';
import { NotificationAttempt } from '../cores/notification-core/entities/notification-attempt.entity';
import { getEnv } from '../shared/utils/env.util';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: getEnv('PG_HOST'),
  port: parseInt(getEnv('PG_PORT', { defaultValue: '5432' }), 10),
  username: getEnv('PG_USER'),
  password: getEnv('PG_PASSWORD'),
  database: getEnv('PG_DB'),
  synchronize: false,
  migrations: [__dirname + '/migrations/*.js'],
  entities: [Notification, NotificationAttempt],
});
