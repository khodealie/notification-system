import { Module } from '@nestjs/common';
import { ProviderModule } from '../provider/provider.module';
import { EmailChannel } from './channels/email.channel';
import { SmsChannel } from './channels/sms.channel';
import { PushChannel } from './channels/push.channel';
import { ChannelFactory } from './channel.factory';

@Module({
  imports: [ProviderModule],
  providers: [EmailChannel, SmsChannel, PushChannel, ChannelFactory],
  exports: [ChannelFactory],
})
export class ChannelModule {}
