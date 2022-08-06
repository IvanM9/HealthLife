/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Server side')
    .setDescription('Documentación de la API de HealthLife')
    .setExternalDoc('Repositorio en GitHub', 'https://github.com/IvanM9/HealthLife')
    .setExternalDoc("Click aquí para ir a la aplicación para usuarios finales","https://healthlifeuteq.herokuapp.com")
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['http://localhost:4200', 'https://healthlifeuteq.herokuapp.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });
  await app.listen(process.env.PORT || 3000);
  console.log('http://localhost:3000/');
}
bootstrap();
