import { Controller, Get } from '@nestjs/common';
import { GrpcMethod, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class GrpcService {
  constructor(private readonly appService: AppService) { }

  @GrpcMethod()
  async getRoles(request) {
    return await this.appService.getRoles(request);
  }

  @GrpcMethod()
  async can(request) {
    return await this.appService.can(request);
  }

  @GrpcMethod()
  async canOnInstance(request) {
    return await this.appService.canOnInstance(request);
  }

  @GrpcMethod()
  async createRole(request) {
    return await this.appService.createRole(request);
  }

  @MessagePattern({ cmd: 'createRole' })
  async asyncCreateRole(request) {
    return await this.appService.createRole(request);
  }
}
