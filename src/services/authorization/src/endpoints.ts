import * as grpc from 'grpc';

import * as handlers from './handlers';

export async function can(call, callback) {
    callback(null, await handlers.can(call.request))
}

export async function canOnInstance(call, callback) {
    callback(null, await handlers.canOnInstance(call.request))
}

export async function createRole(call, callback) {
    try {
        callback(null, await handlers.createRole(call.request))
    } catch (error) {
        callback({
            code: grpc.status.ALREADY_EXISTS,
            message: "role already created"
        }, null)
    }
}

export async function getRoles(call, callback) {
    try {
        callback(null, await handlers.getRoles(call.request))
    } catch (error) {
        callback({
            code: grpc.status.NOT_FOUND,
            message: "roles not found"
        }, null)
    }
}