const { logger } = require('../common/js/logger');
const events = require('../common/js/events')
const { Broker } = require('../common/js/broker')
const { Article } = require('./models')

const broker = new Broker();

async function list({ query, paginator }) {

    try {
        // Get the list of articles
        const { docs } = await Article.paginate(query, paginator);

        logger.info({
            message: "articles fetched",
            payload: {
                args: { query, paginator },
                endpoint: "list"
            }
        })

        return docs;
    } catch (error) {
        logger.error({
            error,
            message: "invalid arguments",
            payload: {
                args: { query, paginator },
                endpoint: "list"
            }
        })
        return [];
    }

}

async function get({ id }) {
    try {
        // Get one article
        const article = await Article.findOne({ _id: id });
        // Throw error if not found
        if (!article) throw Error()
        logger.info({
            message: "article fetched",
            payload: {
                args: { id },
                endpoint: "get"
            }
        })
        return article;
    } catch (error) {
        logger.error({
            message: "article not found",
            payload: {
                args: { id },
                endpoint: "get"
            }
        })
        throw Error(error)
    }


}


async function create(article) {
    try {
        const articleModel = new Article(article);
        const articleCreated = await articleModel.save();
        logger.info({
            message: "article created",
            payload: {
                args: article,
                endpoint: "create"
            }
        })
        return { article: articleCreated };
    } catch (error) {
        logger.error({
            message: "can not create article",
            payload: {
                args: article,
                endpoint: "create"
            }
        })
        throw Error(error);
    }

}

async function update(article) {
    try {
        const query = { _id: article.id }
        delete article.id;
        await Article.findOneAndUpdate(query, article);
        const articleUpdated = await Article.findOne(query)

        logger.info({
            message: "article updated",
            payload: {
                args: article,
                endpoint: "update"
            }
        })

        return { article: articleUpdated };

    } catch (error) {
        logger.error({
            message: "article not found",
            payload: {
                args: article,
                endpoint: "update"
            }
        })
        throw Error(error);
    }
}

async function remove({ id }) {
    try {
        const query = { _id: id }
        const article = await Article.findOne(query);
        article.remove();

        // Publish the event
        broker.publish(events.ARTICLE_DELETED, { id })

        logger.info({
            message: "article deleted",
            payload: {
                args: { id },
                endpoint: "remove"
            }
        })

        return {
            article,
            ok: true
        }
    } catch (error) {
        logger.error({
            message: "article not found",
            payload: {
                args: { id },
                endpoint: "remove"
            }
        })
        throw Error(error);
    }
}

module.exports = {
    list,
    get,
    create,
    update,
    remove
}

