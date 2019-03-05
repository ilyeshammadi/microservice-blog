const grpc = require('grpc');
const handlers = require('./handlers');

function login(call, callback) {
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