import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getEnv } from '../shared/utils/env.util';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: getEnv('PG_HOST'),
      port: parseInt(getEnv('PG_PORT', { defaultValue: '5432' }), 10),
      username: getEnv('PG_USER'),
      password: getEnv('PG_PASSWORD'),
      database: getEnv('PG_DB'),
      autoLoadEntities: true,
      synchronize: false,
    }),
  ],
})
export class DatabaseModule {}
