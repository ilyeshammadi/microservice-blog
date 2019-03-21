const grpc = require('grpc');

const handlers = require('./handlers');

async function can(call, callback) {
    callback(null, await handlers.can(call.request))
}

async function canOnInstance(call, callback) {
    callback(null, await handlers.canOnInstance(call.request))
}

async function createRole(call, callback) {
    try {
        callback(null, await handlers.createRole(call.request))
    } catch (error) {
        callback({
            code: grpc.status.ALREADY_EXISTS,
            message: "role already created"
        }, null)
    }
}

module.exports = {
    can,
    canOnInstance,
    createRole
}