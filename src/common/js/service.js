class Service {
    constructor(name, config) {
        this.name = name;
        this.endpoints = config.endpoints;
        this.events = config.events;
        this.protoPath = config.protoPath || `${__dirname}/../../common/proto/${this.name}/service.proto`;
    }

    async start() {
        if (this.endpoints && this.events) {
            const { startGrpcServer, startRabbitMQConsumer } = require('./tools');
            await startGrpcServer({
                protoFilePath: this.protoPath,
                service: this.endpoints
            });
            startRabbitMQConsumer(this.events, this.name);
        } else if (this.endpoints) {
            const { startGrpcServer } = require('./tools/grpc.tool');
            await startGrpcServer({
                protoFilePath: this.protoPath,
                service: this.endpoints
            });
        } else if (this.events) {
            const { startRabbitMQConsumer } = require('./tools/broker.tool');
            startRabbitMQConsumer(this.events, this.name);
        }
    }
}

module.exports = {
    Service
}