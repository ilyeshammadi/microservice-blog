const grpc = require('grpc');
const { each } = require('lodash');

const logger = require('../common/js/logger')
const bus = require('./utils/bus');
const handlers = require('./handlers');

async function list(call, callback) {
    try {
        const articles = await handlers.list(call.request);

        // Send each article and close the connection when it finishs
        each(articles, article => {
            call.write(article);
        })
        call.end();

        logger.info({
            message: "articles fetched",
            payload: {
                args: call.request,
                endpoint: "List"
            }
        })
    } catch (error) {
        const message = "invalid argument"
        callback({
            code: grpc.status.INVALID_ARGUMENT,
            message,
        }, null)
        logger.error({
            message,
            payload: {
                args: call.request,
                endpoint: "List"
            }
        })
        logger.error(err);
    }

}

async function get(call, callback) {
    try {
        callback(null, await handlers.get(call.request))
        logger.info({
            message: "article fetched",
            payload: {
                args: call.request,
                endpoint: "Get"
            }
        })
    } catch (error) {
        const message = "article not found"
        callback({
            code: grpc.status.NOT_FOUND,
            message,
        }, null)
        logger.error({
            message,
            payload: {
                args: call.request,
                endpoint: "Update"
            }
        })
    }


}

async function create(call, callback) {
    try {
        callback(null, await handlers.create(call.request))
        logger.info({
            message: "article created",
            payload: {
                args: call.request,
                endpoint: "Create"
            }
        })
    } catch (error) {
        const message = "can not create article"
        callback({
            code: grpc.status.INVALID_ARGUMENT,
            message,
        }, null)
        logger.error({
            message,
            payload: {
                args: call.request,
                endpoint: "Update"
            }
        })
    }
}

async function update(call, callback) {
    try {
        callback(null, await handlers.update(call.request));
        logger.info({
            message: "article updated",
            payload: {
                args: call.request,
                endpoint: "Update"
            }
        })
    } catch (error) {
        const message = "article not found"
        callback({
            code: grpc.status.NOT_FOUND,
            message,
        }, null)
        logger.error({
            message,
            payload: {
                args: call.request,
                endpoint: "Update"
            }
        })
    }
}

async function remove(call, callback) {
    try {
        callback(null, await handlers.remove(call.request));
        // Publish the event
        bus.producer.publish('ArticleDeleted', { id: call.request.id })

        logger.info({
            message: "article deleted",
            payload: {
                args: call.request,
                endpoint: "Remove"
            }
        })
    } catch (error) {
        const message = "article not found";
        callback({
            code: grpc.status.NOT_FOUND,
            message,
        }, null)
        logger.error({
            message,
            payload: {
                args: call.request,
                endpoint: "Remove"
            }
        })
    }
}

module.exports = {
    list,
    get,
    create,
    update,
    remove
}