import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as morgan from 'morgan';
import { envs } from './settings';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(morgan('dev'));
  const config = new DocumentBuilder()
    .setTitle('API - Clean Architecture With NestJS & TypeScript')
    .setDescription('The Clean architecture API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    customSiteTitle: 'API Documentation',
    swaggerOptions: {
      url: '/api-json',
    },
    customCssUrl:
      'https://mariosalazar-styles-swagger-ui.vercel.app/css/swagger-ui.css',
  });
  await app.listen(envs.port ?? 3000);
  logger.log(
    `🚀🌐 Application is running on: http://localhost:${envs.port} 🎉✅ ✔`,
  );
}
bootstrap();
