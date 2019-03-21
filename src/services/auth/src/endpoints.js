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
    logger.info({
        message: "Getting the user by the token",
        payload: {
            endpoint: "getUser"
        }
    })
    handlers.getUser(call.request)
        .then((response) => {
            if (response) {
                callback(null, response)
            } else {
                callback({
                    code: 404,
                    message: "invalid token",
                    status: grpc.status.NOT_FOUND,
                }, null)
            }
        })
}

module.exports = {
    login,
    getUser,
}