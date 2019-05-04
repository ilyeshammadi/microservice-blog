import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';

export function createGrpcClient(serviceName, options: any = {}) {
    const { servicePort, protoPath } = options;
    const port = servicePort || "50050";
    const PROTO_PATH = protoPath || `${__dirname}/../../common/proto/${serviceName}/service.proto`;
    const SERVICE_ADDRESS = `${serviceName}:${port}`;
    const packageDefinition = protoLoader.loadSync(PROTO_PATH);
    const service: any = grpc.loadPackageDefinition(packageDefinition);
    return new service.service.GrpcService(
        SERVICE_ADDRESS,
        grpc.credentials.createInsecure()
    );
}
