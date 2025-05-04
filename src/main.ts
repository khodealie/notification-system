import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { getEnv } from './shared/utils/env.util';

const logger = new Logger('main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = Number(getEnv('PORT', { defaultValue: '3000' }));
  await app.listen(port);
  logger.log(`🚀  API ready at port: ${port}`);
}

bootstrap();
