const events = require('../common/js/events');
const logger = require('../common/js/logger');
const { Broker } = require('../common/js/broker');
const handlers = require('./handlers')

const broker = new Broker()

// When an article is deleted, delete the comments
broker.on(events.ARTICLE_DELETED, async (message) => {
    try {
        handlers.removeMany({ articleId: message.id });
    } catch (error) {
        logger.error(error)
    }
})


module.exports = {
    broker
}