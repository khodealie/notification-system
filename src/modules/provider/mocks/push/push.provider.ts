import { Injectable, Logger } from '@nestjs/common';
import {
  ChannelProvider,
  ProviderResponse,
} from '../../interfaces/provider.interface';
import { PushPayload } from '../../interfaces/payloads/push.payload';

@Injectable()
export class PushProvider implements ChannelProvider<PushPayload> {
  private readonly log = new Logger(PushProvider.name);

  async dispatch(payload: PushPayload): Promise<ProviderResponse> {
    this.log.debug(`MOCK Push → ${JSON.stringify(payload)}`);
    await new Promise((r) => setTimeout(r, 80));
    return { id: `push-${Date.now()}`, raw: { ok: true } };
  }
}
