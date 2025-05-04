export interface EmailPayload {
  to: string;
  subject?: string;
  template?: string;
  data?: Record<string, unknown>;
}
