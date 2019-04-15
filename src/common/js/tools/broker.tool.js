const amqp = require('amqplib');
const amqpCallbackAPI = require('amqplib/callback_api');

const { logger } = require('./logger.tool');

const brokerUrl = process.env.AMQP_URL || 'amqp://rabbitmq';
const exchange = 'main';

function startRabbitMQConsumer(events, queue = '') {
    amqpCallbackAPI.connect(brokerUrl, (err, conn) => {
        logger.info("🎒 Subscriber waiting for events");
        conn.createChannel((err, ch) => {
            ch.assertExchange(exchange, 'topic', { durable: false });
            ch.assertQueue(queue, { exclusive: false }, (err, q) => {
                // Bind the conusmers to the queue
                events.forEach(event => ch.bindQueue(q.queue, exchange, event.topic))
                // Route each message the right event
                ch.consume(q.queue, (msg) => {
                    events.forEach(event => {
                        if (event.topic === msg.fields.routingKey) {
                            const parsedMessage = JSON.parse(msg.content.toString())
                            logger.info({
                                message: "Event consumed",
                                payload: {
                                    message: parsedMessage,
                                    topic: msg.fields.routingKey,
                                }
                            })
                            event.callback(parsedMessage);
                            return;
                        }
                    });
                    ch.ack(msg)
                }, { noAck: false });
            });
        });
    });
}


function emitEvent(topic, message) {
    amqp.connect(brokerUrl).then((c) => {
        c.createConfirmChannel()
            .then((ch) => {

                // Assert the Exchange
                ch.assertExchange(exchange, 'topic', { durable: false });

                // Publish the message
                const stringifedMessage = JSON.stringify(message)

                logger.info({
                    message: "Event published",
                    payload: {
                        message,
                        topic
                    }
                })

                ch.publish(exchange, topic, new Buffer(stringifedMessage), null, err => {
                    if (err) throw Error(err);
                    c.close();
                });
            });
    });
}

module.exports = {
    startRabbitMQConsumer,
    emitEvent
}