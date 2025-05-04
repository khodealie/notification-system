import { Module } from '@nestjs/common';
import { QueueModule } from './queue/queue.module';
import { ProviderModule } from './modules/provider/provider.module';
import { ChannelModule } from './modules/channel/channel.module';
import { NotificationModule } from './modules/notification/notification.module';
import { DatabaseModule } from './database/database.module';
import { NotificationCoreModule } from './cores/notification-core/notification-core.module';

@Module({
  imports: [
    DatabaseModule,
    QueueModule,
    ProviderModule,
    ChannelModule,
    NotificationModule,
    NotificationCoreModule,
  ],
})
export class AppModule {}
