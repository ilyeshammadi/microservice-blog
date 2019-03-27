const grpc = require('grpc');
const logger = require('../common/js/logger');

const handlers = require('./handlers');

function login(call, callback) {
    logger.info({
        message: "User login",
        payload: {
            endpoint: "Login"
        }
    })
    handlers.login(call.request)
        .then((response) => {
            if (response) {
                callback(null, response)
            } else {
                callback({
                    code: 404,
                    message: "user with this username and password does not exists",
                    status: grpc.status.NOT_FOUND,
                }, null)
            }

        })
}

function getUser(call, callback) {
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