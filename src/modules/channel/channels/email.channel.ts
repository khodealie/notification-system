import { Injectable } from '@nestjs/common';
import { NotificationChannel } from '../interfaces/channel.interface';
import { EmailNotification } from '../../../shared/payloads/notification-payload';
import { ChannelKey } from '../../../shared/enums/channel-key.enum';
import { ProviderRouter } from '../../provider/provider.router';

@Injectable()
export class EmailChannel implements NotificationChannel {
  readonly key = ChannelKey.EMAIL;

  constructor(private router: ProviderRouter) {}

  async send(n: EmailNotification) {
    const { template, templateData } = n.content;
    return this.router.dispatch(this.key, {
      to: n.recipient,
      subject: n.subject,
      template,
      data: templateData,
    });
  }
}
