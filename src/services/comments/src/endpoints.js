const { each } = require('lodash');

const logger = require('../common/js/logger');
const handlers = require('./handlers');


function list(call) {
    logger.info({
        message: "Getting a list of comments",
        payload: {
            endpoint: 'List',
            args: call.request
        }
    })
    handlers.list(call.request).then(({ comments }) => {
        each(comments, comment => call.write(comment))
        call.end()
    });
}

function get(call, callback) {
    logger.info({
        message: "Getting one comment",
        payload: {
            endpoint: 'Get',
            args: call.request
        }
    })
    handlers.get(call.request).then((response) => callback(null, response))
}

function create(call, callback) {
    logger.info({
        message: "Creating a comment",
        payload: {
            endpoint: 'Create',
            args: call.request
        }
    })
    handlers.create(call.request).then(response => callback(null, response))
}

module.exports = {
    list,
    get,
    create,
}