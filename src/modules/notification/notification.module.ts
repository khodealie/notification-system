import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { QueueModule } from '../../queue/queue.module';
import { NotificationCoreModule } from '../../cores/notification-core/notification-core.module';

@Module({
  imports: [NotificationCoreModule, QueueModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
