import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { connect, connection } from 'mongoose';
import * as broker from '../common/js/tools/broker.tool';

@Controller()
export default class HealthCheckController {
  @Get('/liveness')
  liveness() {
    return;
  }
  @Get('/readiness')
  async readiness() {
    const exception = new HttpException(
      'required resource not available',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    try {
      // check connection to mongodb
      await connect(
        `${process.env.MONGODB_URL}/test`,
        { useNewUrlParser: true },
      );
      connection.close();
    } catch (error) {
      throw exception;
    }

    try {
      // check rabbitmq
      await broker.checkConnection();
    } catch (error) {
      throw exception;
    }
  }
}
