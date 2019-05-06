require('dotenv').config();
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { authGrpcServerOptions } from './options/users-grpc-server.option';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(authGrpcServerOptions);
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
