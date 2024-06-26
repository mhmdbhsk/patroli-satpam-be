import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const port = process.env.PORT || 3000;
console.log(
  `Launching NestJS app on port ${port}, URL: http://0.0.0.0:${port}`,
);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Patroli Satpam')
    .setDescription('The Patroli Satpam API description')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.enableCors({
    allowedHeaders: ['content-type', 'Authorization'],
    origin: 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(port);
}

bootstrap();
