const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');
const service = require('./endpoints.js')
const PROTO_PATH = '../proto/auth/service.proto';

const serviceDefinition = protoLoader.loadSync(PROTO_PATH);
var serviceProto = grpc.loadPackageDefinition(serviceDefinition);
const server = new grpc.Server()

const SERVICE_HOST = process.env.SERVICE_HOST || '0.0.0.0';
const SERVICE_PORT = process.env.SERVICE_PORT || '50050';
const SERVICE_ADDRESS = `${SERVICE_HOST}:${SERVICE_PORT}`;

server.addProtoService(serviceProto.Service.service, service)
server.bind(SERVICE_ADDRESS, grpc.ServerCredentials.createInsecure())
console.log(`Server running at ${SERVICE_ADDRESS}`)
server.start()