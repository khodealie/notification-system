import { Module } from '@nestjs/common';
import { ChannelProvider } from './interfaces/provider.interface';
import { ProviderRouter } from './provider.router';
import { SendgridProvider } from './mocks/email/sendgrid.provider';
import { TwilioProvider } from './mocks/sms/twilio.provider';
import { PushProvider } from './mocks/push/push.provider';
import { ChannelKey } from '../../shared/enums/channel-key.enum';
import { PROVIDER_REGISTRY } from './provider.constants';

@Module({
  providers: [
    SendgridProvider,
    TwilioProvider,
    PushProvider,
    {
      provide: PROVIDER_REGISTRY,
      useFactory: (
        sg: SendgridProvider,
        tw: TwilioProvider,
        push: PushProvider,
      ) =>
        new Map<ChannelKey, ChannelProvider<unknown>[]>([
          [ChannelKey.EMAIL, [sg]],
          [ChannelKey.SMS, [tw]],
          [ChannelKey.PUSH, [push]],
        ]),
      inject: [SendgridProvider, TwilioProvider, PushProvider],
    },
    {
      provide: ProviderRouter,
      useFactory: (reg: Map<ChannelKey, ChannelProvider<unknown>[]>) =>
        new ProviderRouter(reg),
      inject: [PROVIDER_REGISTRY],
    },
  ],
  exports: [ProviderRouter],
})
export class ProviderModule {}
