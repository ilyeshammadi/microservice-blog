const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');

const logger = require('./logger')

class Server {
    constructor(args) {
        this.protoFilePath = args.protoFilePath;
        this.service = args.service;
        this.host = args.host ? args.host : '0.0.0.0';
        this.port = args.port ? args.port : '50050';
        this.serviceAddress = `${this.host}:${this.port}`
    }

    start() {
        const serviceDefinition = protoLoader.loadSync(this.protoFilePath);
        const serviceProto = grpc.loadPackageDefinition(serviceDefinition);
        const server = new grpc.Server()

        server.addService(serviceProto.Service.service, this.service)
        server.bind(this.serviceAddress, grpc.ServerCredentials.createInsecure())
        logger.info(`🥑 gRPC server running at ${this.serviceAddress}`)
        server.start()
    }
}

module.exports = {
    Server,
}


