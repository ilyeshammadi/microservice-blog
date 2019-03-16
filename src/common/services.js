const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

function getUsersServiceClient() {
    const PROTO_PATH = '../../proto/users/service.proto';
    const SERVICE_ADDRESS = 'users:50050';
    const packageDefinition = protoLoader.loadSync(PROTO_PATH);
    const service = grpc.loadPackageDefinition(packageDefinition);
    return new service.Service(SERVICE_ADDRESS, grpc.credentials.createInsecure());
}

function getAuthServiceClient() {
    const PROTO_PATH = '../../proto/auth/service.proto';
    const SERVICE_ADDRESS = 'auth:50050';
    const packageDefinition = protoLoader.loadSync(PROTO_PATH);
    const service = grpc.loadPackageDefinition(packageDefinition);
    return new service.Service(SERVICE_ADDRESS, grpc.credentials.createInsecure());
}

function getArticlesServiceClient() {
    const PROTO_PATH = '../../proto/articles/service.proto';
    const SERVICE_ADDRESS = 'articles:50050';
    const packageDefinition = protoLoader.loadSync(PROTO_PATH);
    const service = grpc.loadPackageDefinition(packageDefinition);
    return new service.Service(SERVICE_ADDRESS, grpc.credentials.createInsecure());
}

function getCommentsServiceClient() {
    const PROTO_PATH = '../../proto/comments/service.proto';
    const SERVICE_ADDRESS = 'comments:50050';
    const packageDefinition = protoLoader.loadSync(PROTO_PATH);
    const service = grpc.loadPackageDefinition(packageDefinition);
    return new service.Service(SERVICE_ADDRESS, grpc.credentials.createInsecure());
}

module.exports = {
    getUsersServiceClient,
    getAuthServiceClient,
    getArticlesServiceClient,
    getCommentsServiceClient,
}