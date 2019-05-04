import { ClientOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

export const authGrpcClientOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        url: 'auth:50050',
        package: 'service',
        protoPath: join(__dirname, '../../../common/proto/auth/service.proto'),
    },
}