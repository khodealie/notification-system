import { ProviderResponse } from '../../provider/interfaces/provider.interface';
import {
  EmailNotification,
  PushNotification,
  SmsNotification,
} from '../../../shared/payloads/notification-payload';
import { ChannelKey } from '../../../shared/enums/channel-key.enum';

export interface NotificationChannel {
  readonly key: ChannelKey;

  send(
    notif: EmailNotification | SmsNotification | PushNotification,
  ): Promise<ProviderResponse>;
}
