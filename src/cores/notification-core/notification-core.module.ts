import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationAttempt } from './entities/notification-attempt.entity';
import { NotificationRepository } from './repositories/notification.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, NotificationAttempt])],
  providers: [NotificationRepository],
  exports: [NotificationRepository, TypeOrmModule],
})
export class NotificationCoreModule {}
