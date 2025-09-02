import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createLogger, format, transports } from 'winston';
import { ConfigService } from '@nestjs/config';
import { RequestMethod } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const instanceLog = createLogger({
    level: 'debug',
    format: format.combine(
      format.timestamp(),
      format.json(),
      format.prettyPrint(),
    ),
    transports: [new transports.Console()],
  });

  const app = await NestFactory.create(AppModule, {
    logger: instanceLog,
  });
  app.enableCors();
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }, 'docs'],
  });
  const configuration = app.get(ConfigService);
  console.log(configuration.get<string>('STAGE_ENV'));
  if (configuration.get<string>('STAGE_ENV') !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Portfolio API Documentation')
      .setVersion('0.1')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);
  }
  await app.listen(configuration.get<number>('app.port') || 3010);
}
bootstrap();
