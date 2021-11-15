import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
require('dotenv').config();

if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('My first NESTjs')
    .setDescription('documentation REST API')
    .setVersion('1.0.0')
    .addTag('AlexanderKhom')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
