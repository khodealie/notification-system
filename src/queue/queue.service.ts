import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { DataSource } from 'typeorm';
import { NotificationRepository } from '../cores/notification-core/repositories/notification.repository';
import { NotificationAttempt } from '../cores/notification-core/entities/notification-attempt.entity';
import { Notification } from '../cores/notification-core/entities/notification.entity';
import { NotificationStatus } from '../shared/enums/notification-status.enum';
import { ChannelFactory } from '../modules/channel/channel.factory';
import { NOTIF_QUEUE } from './queue.constants';

import {
  NotificationPayload,
  EmailNotification,
  SmsNotification,
  PushNotification,
} from '../shared/payloads/notification-payload';
import {
  EmailContentSchema,
  SmsContentSchema,
  PushContentSchema,
} from '../shared/payloads/zod-content-schemas';
import { ChannelKey } from '../shared/enums/channel-key.enum';

@Injectable()
export class QueueService {
  private readonly log = new Logger(QueueService.name);

  constructor(
    @InjectQueue(NOTIF_QUEUE)
    private readonly queue: Queue,
    private readonly notificationRepo: NotificationRepository,
    private readonly channelFactory: ChannelFactory,
    private readonly ds: DataSource,
  ) {}

  async enqueue(id: string) {
    this.log.debug(`Enqueue notification ${id}`);
    return this.queue.add('send', { id }, { attempts: 3, backoff: 1000 });
  }

  async handle(id: string) {
    const notif = await this.notificationRepo.findLite(id);
    if (!notif) {
      this.log.warn(`Notification ${id} not found`);
      return;
    }

    await this.notificationRepo.updateStatus(id, NotificationStatus.RETRYING);

    try {
      const payload = this.toPayload(notif);
      const channel = this.channelFactory.resolve(payload.channel);
      const response = await channel.send(payload);

      await this.markAsSent(id, response);
      this.log.debug(`Notification ${id} sent successfully`);
    } catch (err) {
      await this.markAsFailed(id, err as Error);
      throw err;
    }
  }

  private toPayload(
    notif: Awaited<ReturnType<NotificationRepository['findLite']>>,
  ): NotificationPayload {
    switch (notif!.channel) {
      case ChannelKey.EMAIL:
        return {
          channel: ChannelKey.EMAIL,
          recipient: notif!.recipient,
          subject: notif!.subject,
          content: EmailContentSchema.parse(notif!.content),
        } as EmailNotification;
      case ChannelKey.SMS:
        return {
          channel: ChannelKey.SMS,
          recipient: notif!.recipient,
          content: SmsContentSchema.parse(notif!.content),
        } as SmsNotification;
      case ChannelKey.PUSH:
      default:
        return {
          channel: ChannelKey.PUSH,
          recipient: notif!.recipient,
          content: PushContentSchema.parse(notif!.content),
        } as PushNotification;
    }
  }

  private async markAsSent(id: string, response: unknown) {
    await this.ds.transaction(async (manager) => {
      await manager.save(Notification, {
        id,
        status: NotificationStatus.SENT,
      });
      await manager.save(NotificationAttempt, {
        notification: { id },
        providerResponse: response,
      });
    });
  }

  private async markAsFailed(id: string, error: Error) {
    await this.ds.transaction(async (manager) => {
      await manager.increment(Notification, { id }, 'retries', 1);
      await manager.save(Notification, {
        id,
        status: NotificationStatus.FAILED,
      });
      await manager.save(NotificationAttempt, {
        notification: { id },
        errorMessage: error.message,
      });
    });

    this.log.error(`Notification ${id} failed: ${error.message}`);
  }
}
