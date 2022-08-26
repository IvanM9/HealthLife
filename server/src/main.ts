/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Documentación de la API de HealthLife')
    .setContact('HealthLife team', 'https://github.com/IvanM9/HealthLife',null)
    .setExternalDoc("Click aquí para ir a la aplicación para usuarios finales","https://healthlifeuteq.herokuapp.com")
    .setVersion('2.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.ORIGIN || "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });
  await app.listen(process.env.PORT || 3000);
  console.log(await app.getUrl());
}
bootstrap();
