import { NatsOptions, Transport } from "@nestjs/microservices";

export const natsClientOption: NatsOptions = {
    transport: Transport.NATS,
    options: {
        url: process.env.NATS_URL
    }
}