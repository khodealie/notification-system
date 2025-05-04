export interface PushPayload {
  deviceToken: string;
  payload: Record<string, unknown>;
}
