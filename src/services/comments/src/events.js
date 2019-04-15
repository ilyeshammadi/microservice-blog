const { logger, events } = require('../common/js/tools');
const handlers = require('./handlers')

function handleArticleDeleted(message) {
    try {
        handlers.removeMany({ articleId: message.id });
    } catch (error) {
        logger.error(error)
    }
}


module.exports = [
    { topic: events.ARTICLE_DELETED, callback: handleArticleDeleted }
]