import { Injectable, Logger } from '@nestjs/common';
import {
  ChannelProvider,
  ProviderResponse,
} from '../../interfaces/provider.interface';
import { SmsPayload } from '../../interfaces/payloads/sms.payload';

@Injectable()
export class TwilioProvider implements ChannelProvider<SmsPayload> {
  private readonly log = new Logger(TwilioProvider.name);

  async dispatch(payload: SmsPayload): Promise<ProviderResponse> {
    this.log.debug(`MOCK Twilio SMS → ${JSON.stringify(payload)}`);
    await new Promise((r) => setTimeout(r, 120));
    return { id: `tw-${Date.now()}`, raw: { ok: true } };
  }
}
