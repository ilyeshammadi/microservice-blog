const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

function getUsersServiceClient() {
    const PROTO_PATH = '../proto/users/service.proto';
    const SERVICE_ADDRESS = 'users:50050';
    const packageDefinition = protoLoader.loadSync(PROTO_PATH);
    const service = grpc.loadPackageDefinition(packageDefinition);
    return new service.Service(SERVICE_ADDRESS, grpc.credentials.createInsecure());
}

function generateToken() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 35; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

module.exports = {
    getUsersServiceClient,
    generateToken,
}