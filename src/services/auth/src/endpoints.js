const grpc = require('grpc');
const logger = require('../common/js/logger');

const handlers = require('./handlers');

async function login(call, callback) {
    try {
        callback(null, await handlers.login(call.request));
    } catch (error) {
        callback({
            status: grpc.status.NOT_FOUND,
            message: "user with this username and password does not exists",
        }, null)
    }

}

async function getUser(call, callback) {
    try {
        callback(null, await handlers.getUser(call.request));
    } catch (error) {
        callback({
            code: grpc.status.NOT_FOUND,
            message: "invalid token",
        }, null);
    }
}

module.exports = {
    login,
    getUser,
}