import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
  .setTitle('Authentication Service')
  .setDescription('Authnticcation Service endpoints')
  .setVersion('1.0')
  .addServer('http://localhost:3000/', 'Local environment')
  .build();

const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
}
bootstrap();
