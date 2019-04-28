require('dotenv').config();
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './module';

const grpcOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'service',
    url: '0.0.0.0:50050',
    protoPath: join(__dirname, '../common/proto/articles/service.proto'),
  },
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(grpcOptions);
  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
