import { Module } from '@nestjs/common';
import { GrpcService } from './app.controller';
import HealthCheckController from './health-check.controller';
import { Service } from './service';

@Module({
  imports: [],
  controllers: [GrpcService, HealthCheckController],
  providers: [Service],
})
export class AppModule { }
