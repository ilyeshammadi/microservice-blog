const { each } = require('lodash');

const logger = require('../common/logger')
const handlers = require('./handlers');


function list(call) {
    logger.info({
        message: "Getting list of articles",
        payload: {
            args: call.request,
            endpoint: "List"
        }
    })
    // Stream the articles
    handlers.list(call.request)
        .then(({ articles }) => {
            each(articles, article => {
                call.write(article);
            })
            call.end();
        }).catch(err => {
            logger.error(err);
        });
}

function get(call, callback) {
    logger.info({
        message: "Getting one article",
        payload: {
            args: call.request,
            endpoint: "Get"
        }
    })
    handlers.get(call.request).then((response) => callback(null, response))
}

function create(call, callback) {
    logger.info({
        message: "Creating one article",
        payload: {
            args: call.request,
            endpoint: "Create"
        }
    })
    handlers.create(call.request).then(response => callback(null, response))
}

function update(call, callback) {
    logger.info({
        message: "Updating one article",
        payload: {
            args: call.request,
            endpoint: "Update"
        }
    })
    handlers.update(call.request).then(response => callback(null, response))
}

function remove(call, callback) {
    logger.info({
        message: "Deleting one article",
        payload: {
            args: call.request,
            endpoint: "Delete"
        }
    })
    handlers.remove(call.request).then(response => callback(null, response))
}

module.exports = {
    list,
    get,
    create,
    update,
    remove
}