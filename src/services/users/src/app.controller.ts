import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { from } from 'rxjs';
import { GrpcLoggingInterceptor } from './logging.interceptor';

@UseInterceptors(GrpcLoggingInterceptor)
@Controller()
export class GrpcService {
  constructor(private readonly service: AppService) { }

  @GrpcMethod()
  async list(request) {
    const users = await this.service.list(request);
    return from(users)
  }

  @GrpcMethod()
  get(request) {
    return this.service.get(request);
  }

  @GrpcMethod()
  create(request) {
    return this.service.create(request);
  }
}
