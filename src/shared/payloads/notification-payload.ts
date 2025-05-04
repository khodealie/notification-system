import { ChannelKey } from '../enums/channel-key.enum';

export interface EmailContent {
  template?: string;
  templateData?: Record<string, unknown>;
}

export interface SmsContent {
  text: string;
}

export interface PushContent {
  payload: Record<string, unknown>;
}

export type EmailNotification = {
  channel: ChannelKey.EMAIL;
  recipient: string;
  subject?: string;
  content: EmailContent;
};

export type SmsNotification = {
  channel: ChannelKey.SMS;
  recipient: string;
  content: SmsContent;
};

export type PushNotification = {
  channel: ChannelKey.PUSH;
  recipient: string;
  content: PushContent;
};

export type NotificationPayload =
  | EmailNotification
  | SmsNotification
  | PushNotification;
