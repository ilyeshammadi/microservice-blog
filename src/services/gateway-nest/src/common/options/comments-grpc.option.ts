import { ClientOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

export const commentsGrpcClientOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        url: 'comments:50050',
        package: 'service',
        protoPath: join(__dirname, '../../../common/proto/comments/service.proto'),
    },
}