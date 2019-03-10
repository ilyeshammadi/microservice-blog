const grpc = require('grpc');
const { each } = require('lodash');

const logger = require('./utils/logger');
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

function get(call, callback) {
    logger.info({
        message: "Getting one user",
        payload: {
            endpoint: 'Get',
            args: call.request
        }
    })
    const id = call.request.id;
    handlers.get(id).then((res => callback(null, res)))
}

function create(call, callback) {
    logger.info({
        message: "Creating a user",
        payload: {
            endpoint: 'Create'
        }
    })
    const username = call.request.username;
    const password = call.request.password;
    handlers.create(username, password).then(res => {
        callback(null, { user: res })
    }).catch((err) => {
        callback({
            message: "user with this username and password already exists",
            status: grpc.status.ALREADY_EXISTS,
        }, null)
    })
}

module.exports = {
    list,
    get,
    create,
}