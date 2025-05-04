import { Injectable, Logger } from '@nestjs/common';
import {
  ChannelProvider,
  ProviderResponse,
} from '../../interfaces/provider.interface';
import { EmailPayload } from '../../interfaces/payloads/email.payload';

@Injectable()
export class SendgridProvider implements ChannelProvider<EmailPayload> {
  private log = new Logger(SendgridProvider.name);

  async dispatch(p: EmailPayload): Promise<ProviderResponse> {
    this.log.debug(`SendGrid MOCK → ${JSON.stringify(p)}`);
    await new Promise((r) => setTimeout(r, 150));
    return { id: `sg-${Date.now()}`, raw: { ok: true } };
  }
}
