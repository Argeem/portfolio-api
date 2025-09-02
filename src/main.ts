import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createLogger, format } from 'winston';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const instanceLog = createLogger({
    level: 'debug',
    format: format.combine(
      format.timestamp(),
      format.json(),
      format.prettyPrint(),
    ),
  });

  const app = await NestFactory.create(AppModule, {
    logger: instanceLog,
  });
  const configuration = app.get(ConfigService);
  await app.listen(configuration.get<number>('app.port') || 3000);
}
bootstrap();
