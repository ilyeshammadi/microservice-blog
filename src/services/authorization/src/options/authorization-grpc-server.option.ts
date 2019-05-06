import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const authorizationGrpcClientOptions: GrpcOptions = {
    transport: Transport.GRPC,
    options: {
        package: 'service',
        url: '0.0.0.0:50050',
        protoPath: join(__dirname, '../../common/proto/authorization/service.proto'),
    },
};