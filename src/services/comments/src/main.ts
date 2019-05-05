require('dotenv').config();
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './module';
import { grpcServerOptions } from './options/grpc-server.option';
import { natsServerOptions } from './options/nats-server.option';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(grpcServerOptions);
  app.connectMicroservice(natsServerOptions)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
