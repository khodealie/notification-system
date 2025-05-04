import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NotificationAttempt } from './notification-attempt.entity';
import { ChannelKey } from '../../../shared/enums/channel-key.enum';
import { NotificationStatus } from '../../../shared/enums/notification-status.enum';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ChannelKey })
  channel: ChannelKey;

  @Column() recipient: string;
  @Column({ nullable: true }) subject?: string;
  @Column('jsonb') content: Record<string, unknown>;

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.PENDING,
  })
  status: NotificationStatus;

  @Column({ default: 0 }) retries: number;

  @OneToMany(() => NotificationAttempt, (a) => a.notification, {
    cascade: ['insert'],
  })
  attempts: NotificationAttempt[];

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
