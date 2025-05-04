import { Injectable } from '@nestjs/common';
import {
  ChannelProvider,
  ProviderResponse,
} from './interfaces/provider.interface';
import { ChannelKey } from '../../shared/enums/channel-key.enum';

type ProviderList = ChannelProvider<unknown>[];

@Injectable()
export class ProviderRouter {
  private readonly roundRobinIndex = new Map<ChannelKey, number>();

  constructor(private readonly registry: Map<ChannelKey, ProviderList>) {}

  async dispatch(
    channel: ChannelKey,
    payload: unknown,
  ): Promise<ProviderResponse> {
    const providers = this.registry.get(channel);
    if (!providers || providers.length === 0) {
      throw new Error(`No providers registered for ${channel}`);
    }

    // simple RR algorithm
    const idx = this.roundRobinIndex.get(channel) ?? 0;
    const provider = providers[idx];
    this.roundRobinIndex.set(channel, (idx + 1) % providers.length);

    return provider.dispatch(payload);
  }
}
