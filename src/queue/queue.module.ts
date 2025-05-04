import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QueueService } from './queue.service';
import { QueueProcessor } from './queue.processor';
import { NOTIF_QUEUE } from './queue.constants';
import { getEnv } from '../shared/utils/env.util';
import { NotificationCoreModule } from '../cores/notification-core/notification-core.module';
import { ChannelModule } from '../modules/channel/channel.module';

@Module({
  imports: [
    ChannelModule,
    NotificationCoreModule,
    BullModule.forRoot({
      connection: {
        host: getEnv('REDIS_HOST', { defaultValue: 'localhost' }),
        port: parseInt(getEnv('REDIS_PORT', { defaultValue: '6379' }), 10),
      },
    }),
    BullModule.registerQueue({
      name: NOTIF_QUEUE,
    }),
  ],
  providers: [QueueService, QueueProcessor],
  exports: [QueueService],
})
export class QueueModule {}
