import { Module } from '@nestjs/common';
import { GrpcService } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [GrpcService],
  providers: [AppService],
})
export class AppModule { }
