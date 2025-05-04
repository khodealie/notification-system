import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { getEnv } from './shared/utils/env.util';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
    .setTitle('Notification System API')
    .setDescription('API documentation for sending and tracking notifications')
    .setVersion('1.0')
    .addTag('Notifications')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = Number(getEnv('PORT', { defaultValue: '3000' }));
  await app.listen(port);
  logger.log(`🚀  API ready at port: ${port}`);
}

bootstrap();
