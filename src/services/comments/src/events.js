const { first } = require('lodash')

const events = require('../common/js/events');
const logger = require('../common/js/logger');
const { Broker } = require('../common/js/broker');
const handlers = require('./handlers')

const broker = new Broker()

broker.on(events.ARTICLE_DELETED, (message) => {
    try {
        const articleId = message.id;
        const comment = first(handlers.list({ articleId }))
        if (comment) {
            // TODO: Impletemnt delete article
            logger.info({
                message: "comment deleted"
            })
        }
    } catch (error) {
        logger.error(error)
    }
})


module.exports = {
    broker
}