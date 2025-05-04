import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

const logger = new Logger('ENV');

export function getEnv(
  key: string,
  options?: {
    defaultValue?: string;
    warn?: boolean;
  },
): string {
  const res = process.env[key];
  const defaultValue = options?.defaultValue;

  if (!res && defaultValue === undefined) {
    logger.error(`❌ Environment variable "${key}" is missing!`);
    process.exit(1);
  }

  if (!res && options?.warn !== false) {
    logger.warn(`⚠️ "${key}" is missing, using default "${defaultValue}"`);
  }

  return res || (defaultValue as string);
}
