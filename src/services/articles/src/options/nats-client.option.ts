import { NatsOptions, Transport } from "@nestjs/microservices";

export const natsClientOptions: NatsOptions = {
    transport: Transport.NATS,
    options: {
        url: process.env.NATS_URL
    }
}