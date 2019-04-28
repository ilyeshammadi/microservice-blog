import { Module } from '@nestjs/common';
import { ServiceController } from './controller';
import { Service } from './service';
import HealthCheckController from './health-check.controller';

@Module({
  imports: [],
  controllers: [ServiceController, HealthCheckController],
  providers: [Service],
})
export class AppModule {}
