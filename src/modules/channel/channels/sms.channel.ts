import { Injectable } from '@nestjs/common';
import { NotificationChannel } from '../interfaces/channel.interface';
import { SmsNotification } from '../../../shared/payloads/notification-payload';
import { ChannelKey } from '../../../shared/enums/channel-key.enum';
import { ProviderRouter } from '../../provider/provider.router';

@Injectable()
export class SmsChannel implements NotificationChannel {
  readonly key = ChannelKey.SMS;

  constructor(private router: ProviderRouter) {}

  async send(n: SmsNotification) {
    const { text } = n.content;
    return this.router.dispatch(this.key, {
      to: n.recipient,
      text,
    });
  }
}
