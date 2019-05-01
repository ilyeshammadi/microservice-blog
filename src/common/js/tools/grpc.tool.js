const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const { logger } = require("./logger.tool");

function startGrpcServer(config) {
  const protoFilePath = config.protoFilePath;
  const service = config.service;
  const host = config.host || "0.0.0.0";
  const port = config.port || "50050";
  const serviceAddress = `${host}:${port}`;

  const serviceDefinition = protoLoader.loadSync(protoFilePath);
  const serviceProto = grpc.loadPackageDefinition(serviceDefinition);
  const server = new grpc.Server();

  server.addService(serviceProto.service.GrpcService.service, service);
  server.bind(serviceAddress, grpc.ServerCredentials.createInsecure());
  logger.info(`🥑 gRPC server running at ${serviceAddress}`);
  server.start();
}

function createGrpcClient(serviceName, { servicePort, protoPath } = {}) {
  const port = servicePort || "50050";
  const PROTO_PATH = protoPath || `./common/proto/${serviceName}/service.proto`;
  const SERVICE_ADDRESS = `${serviceName}:${port}`;
  const packageDefinition = protoLoader.loadSync(PROTO_PATH);
  const service = grpc.loadPackageDefinition(packageDefinition);
  return new service.service.GrpcService(
    SERVICE_ADDRESS,
    grpc.credentials.createInsecure()
  );
}

module.exports = {
  startGrpcServer,
  createGrpcClient
};
