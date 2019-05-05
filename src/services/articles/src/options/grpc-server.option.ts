import { GrpcOptions } from "@nestjs/microservices";
import { Transport } from "@nestjs/common/enums/transport.enum";
import { join } from "path";

export const grpcServerOptions: GrpcOptions = {
    transport: Transport.GRPC,
    options: {
        package: 'service',
        url: '0.0.0.0:50050',
        protoPath: join(__dirname, '../../common/proto/articles/service.proto'),
    },
};