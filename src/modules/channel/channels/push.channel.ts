import { Injectable } from '@nestjs/common';
import { NotificationChannel } from '../interfaces/channel.interface';
import { PushNotification } from '../../../shared/payloads/notification-payload';
import { ChannelKey } from '../../../shared/enums/channel-key.enum';
import { ProviderRouter } from '../../provider/provider.router';

@Injectable()
export class PushChannel implements NotificationChannel {
  readonly key = ChannelKey.PUSH;

  constructor(private router: ProviderRouter) {}

  async send(n: PushNotification) {
    const { payload } = n.content;
    return this.router.dispatch(this.key, {
      deviceToken: n.recipient,
      payload,
    });
  }
}
