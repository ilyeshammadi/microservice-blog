import { NatsOptions, Transport } from "@nestjs/microservices";

export const natsServerOptions: NatsOptions = {
    transport: Transport.NATS,
    options: {
        queue: 'comments',
        name: 'comments',
        url: process.env.NATS_URL
    }
}