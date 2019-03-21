const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

function getServiceClient(serviceName, port = '50050') {
    const PROTO_PATH = `./common/proto/${serviceName}/service.proto`;
    const SERVICE_ADDRESS = `${serviceName}:${port}`;
    const packageDefinition = protoLoader.loadSync(PROTO_PATH);
    const service = grpc.loadPackageDefinition(packageDefinition);
    return new service.Service(SERVICE_ADDRESS, grpc.credentials.createInsecure());
}

function getUsersServiceClient() {
    return getServiceClient('users');
}

function getAuthServiceClient() {
    return getServiceClient('auth');
}

function getArticlesServiceClient() {
    return getServiceClient('articles');
}

function getCommentsServiceClient() {
    return getServiceClient('comments');
}

module.exports = {
    getUsersServiceClient,
    getAuthServiceClient,
    getArticlesServiceClient,
    getCommentsServiceClient,
    getServiceClient
}