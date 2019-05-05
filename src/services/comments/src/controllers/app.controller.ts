import { Controller, UseInterceptors } from '@nestjs/common';
import { GrpcMethod, EventPattern } from '@nestjs/microservices';
import { from } from 'rxjs';
import { Service } from '../app.service';
import { GrpcLoggingInterceptor } from '../logging.interceptor';

@UseInterceptors(GrpcLoggingInterceptor)
@Controller()
export class GrpcService {
  constructor(private readonly service: Service) { }

  @GrpcMethod()
  async list(request) {
    const comments = await this.service.list(request);
    return from(comments);
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
