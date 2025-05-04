export interface ProviderResponse {
  id: string;
  raw: unknown;
}

export interface ChannelProvider<Payload> {
  dispatch(payload: Payload): Promise<ProviderResponse>;
}
