const grpc = require('grpc');
const { each } = require('lodash');

const { logger } = require('../common/js/logger');
const handlers = require('./handlers');

function list(call) {
    logger.info({
        message: "Getting a list of users",
        payload: {
            endpoint: 'List',
            args: call.request
        }
    })
    handlers.list(call.request).then(({ users }) => {
        each(users, user => {
            call.write(user);
        })
        call.end()
    }).catch(err => {
        throw err
    });
}

async function get(call, callback) {
    try {
        const id = call.request.id;
        callback(null, await handlers.get(id))
    } catch (error) {
        callback({
            code: grpc.status.NOT_FOUND,
            message: 'user not found'
        }, null)
    }
}

async function create(call, callback) {
    try {
        callback(null, await handlers.create(call.request))
    } catch (error) {
        callback({
            message: "user with this username and password already exists",
            code: grpc.status.ALREADY_EXISTS,
        }, null)
    }
}

module.exports = {
    list,
    get,
    create,
}