import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class GrpcService {
  constructor(private readonly appService: AppService) { }

  @GrpcMethod()
  async login(request) {
    return await this.appService.login(request);
  }

  @GrpcMethod()
  async getUser(request) {
    return await this.appService.getUser(request);
  }
}
