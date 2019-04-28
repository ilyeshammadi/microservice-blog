import { Controller, Get } from '@nestjs/common';
import { Service } from './service';
import { GrpcMethod } from '@nestjs/microservices';
import { from, forkJoin, asyncScheduler } from 'rxjs';

@Controller()
export class ServiceController {
  constructor(private readonly service: Service) {}

  @GrpcMethod()
  async list(request) {
    const articles = await this.service.list(request);
    return from(articles);
  }

  @GrpcMethod()
  get(request) {
    return this.service.get(request);
  }

  @GrpcMethod()
  create(request) {
    return this.service.create(request);
  }

  @GrpcMethod()
  update(request) {
    return this.service.update(request);
  }

  @GrpcMethod()
  remove(request) {
    return this.service.remove(request);
  }
}
