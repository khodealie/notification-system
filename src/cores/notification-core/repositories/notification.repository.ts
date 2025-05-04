import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';
import { SendNotificationDto } from '../../../shared/dtos/send-notification.dto';
import { NotificationStatus } from '../../../shared/enums/notification-status.enum';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectRepository(Notification)
    private readonly repo: Repository<Notification>,
  ) {}

  create(data: Partial<Notification>): Notification {
    return this.repo.create(data);
  }

  save(entity: Notification): Promise<Notification> {
    return this.repo.save(entity);
  }

  async createAndSave(
    dto: SendNotificationDto,
    status: NotificationStatus,
  ): Promise<Notification> {
    const entity = this.repo.create({
      channel: dto.channel,
      recipient: dto.recipient,
      subject: dto.subject,
      content: dto.content as Record<string, unknown>,
      status,
    });
    return this.repo.save(entity);
  }

  findByIdWithAttempts(id: string): Promise<Notification | null> {
    return this.repo.findOne({
      where: { id },
      relations: { attempts: true },
    });
  }

  findLite(id: string): Promise<Notification | null> {
    return this.repo.findOne({ where: { id } });
  }

  updateStatus(id: string, status: NotificationStatus): Promise<void> {
    return this.repo.update({ id }, { status }).then(() => {});
  }

  incrementRetries(id: string): Promise<void> {
    return this.repo.increment({ id }, 'retries', 1).then(() => {});
  }
}
