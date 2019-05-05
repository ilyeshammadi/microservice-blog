import { Module } from '@nestjs/common';
import { GrpcService } from './controllers/app.controller';
import HealthCheckController from './controllers/health-check.controller';
import { Service } from './app.service';
import { EventsController } from './controllers/events.controller'; 

@Module({
  imports: [],
  controllers: [GrpcService, HealthCheckController, EventsController],
  providers: [Service],
})
export class AppModule { }
