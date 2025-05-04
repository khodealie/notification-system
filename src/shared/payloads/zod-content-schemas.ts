import { z } from 'zod';

export const EmailContentSchema = z.object({
  template: z.string(),
  templateData: z.record(z.unknown()).optional(),
});

export const SmsContentSchema = z.object({
  text: z.string(),
});

export const PushContentSchema = z.object({
  payload: z.record(z.unknown()),
});
