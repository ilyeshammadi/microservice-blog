import { ClientOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

export const articlesGrpcClientOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        url: 'articles:50050',
        package: 'service',
        protoPath: join(__dirname, '../../../common/proto/articles/service.proto'),
    },
}