import { Injectable } from '@nestjs/common';
import { QueueService } from '../../queue/queue.service';
import { SendNotificationDto } from '../../shared/dtos/send-notification.dto';
import { NotificationStatus } from '../../shared/enums/notification-status.enum';
import { NotificationRepository } from '../../cores/notification-core/repositories/notification.repository';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepo: NotificationRepository,
    private readonly queueService: QueueService,
  ) {}

  async send(dto: SendNotificationDto) {
    const notif = await this.notificationRepo.createAndSave(
      dto,
      NotificationStatus.PENDING,
    );
    await this.queueService.enqueue(notif.id);
    return { id: notif.id };
  }

  async sendImmediate(dto: SendNotificationDto) {
    const notif = await this.notificationRepo.createAndSave(
      dto,
      NotificationStatus.RETRYING,
    );
    await this.queueService.handle(notif.id);
    return { id: notif.id };
  }

  async findById(id: string) {
    return this.notificationRepo.findByIdWithAttempts(id);
  }
}
