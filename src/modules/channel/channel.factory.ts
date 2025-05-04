import { Injectable } from '@nestjs/common';
import { EmailChannel } from './channels/email.channel';
import { SmsChannel } from './channels/sms.channel';
import { PushChannel } from './channels/push.channel';
import { ChannelKey } from '../../shared/enums/channel-key.enum';
import { NotificationChannel } from './interfaces/channel.interface';

@Injectable()
export class ChannelFactory {
  constructor(
    private readonly email: EmailChannel,
    private readonly sms: SmsChannel,
    private readonly push: PushChannel,
  ) {}

  resolve(key: ChannelKey): NotificationChannel {
    switch (key) {
      case ChannelKey.EMAIL:
        return this.email;
      case ChannelKey.SMS:
        return this.sms;
      case ChannelKey.PUSH:
        return this.push;
      default:
        throw new Error(`Unknown channel ${String(key)}`);
    }
  }
}
