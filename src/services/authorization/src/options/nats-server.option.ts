import { NatsOptions, Transport } from "@nestjs/microservices";

export const natsServerOptions: NatsOptions = {
    transport: Transport.NATS,
    options: {
        url: process.env.NATS_URL,
        queue: 'authorization',
        name: 'authorization'
    }
}