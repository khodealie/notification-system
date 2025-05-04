import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Notification } from './notification.entity';

@Entity('notification_attempts')
export class NotificationAttempt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Notification, (n) => n.attempts, { onDelete: 'CASCADE' })
  notification: Notification;

  @Column('jsonb', { nullable: true })
  providerResponse?: unknown;

  @Column({ nullable: true })
  errorMessage?: string;

  @CreateDateColumn()
  createdAt: Date;
}
