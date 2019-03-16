const amqp = require('amqplib');
const amqpCallbackAPI = require('amqplib/callback_api');

class Base {
    constructor(args = {}) {
        this.brokerUrl = args.brokerUrl ? args.brokerUrl : 'amqp://rabbitmq';
        this.ex = args.exchange ? args.exchange : 'main';
    }
}

class Consumer extends Base {
    constructor(args = {}) {
        super(args);
        this.queue = args.queue ? args.queue : '';
        this.consumers = new Set([]);
    }

    on(topic, callback) {
        this.consumers.add({ topic, callback })
    }

    listen() {
        amqpCallbackAPI.connect(this.brokerUrl, (err, conn) => {
            conn.createChannel((err, ch) => {
                ch.assertExchange(this.ex, 'topic', { durable: false });
                ch.assertQueue(this.queue, { exclusive: false }, (err, q) => {
                    // Bind the conusmers to the queue
                    this.consumers.forEach(consumer => ch.bindQueue(q.queue, this.ex, consumer.topic))
                    // Route each message the right consumer
                    ch.consume(q.queue, (msg) => {
                        this.consumers.forEach(consumer => {
                            if (consumer.topic === msg.fields.routingKey) {
                                const parsedMessage = JSON.parse(msg.content.toString())
                                consumer.callback(parsedMessage);
                                return;
                            }
                        });
                        ch.ack(msg)
                    }, { noAck: false });
                });
            });
        });
    }
}


class Producer extends Base {
    publish(topic, message) {
        amqp.connect(this.brokerUrl).then((c) => {
            c.createConfirmChannel()
                .then((ch) => {

                    // Assert the Exchange
                    ch.assertExchange(this.ex, 'topic', { durable: false });

                    // Publish the message
                    const stringifedMessage = JSON.stringify(message)
                    ch.publish(this.ex, topic, new Buffer(stringifedMessage), null, err => {
                        if (err) throw Error(err);
                        c.close();
                    });
                });
        });
    }
}

module.exports = {
    Producer,
    Consumer,
}