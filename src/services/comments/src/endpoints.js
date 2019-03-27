const grpc = require('grpc');
const { each } = require('lodash');

const handlers = require('./handlers');

async function list(call) {
    const comments = await handlers.list(call.request);

    // Send each comment and close the connection when it finishs
    each(comments, comment => {
        call.write(comment);
    })
    call.end();
}

async function get(call, callback) {
    try {
        callback(null, await handlers.get(call.request))
    } catch (error) {
        callback({
            code: grpc.status.NOT_FOUND,
            message: "comment not found",
        }, null)
    }
}

async function create(call, callback) {
    try {
        callback(null, await handlers.create(call.request))
    } catch (error) {
        callback({
            code: grpc.status.INVALID_ARGUMENT,
            message: "can not create comment",
        }, null)
    }
}

async function update(call, callback) {
    try {
        callback(null, await handlers.update(call.request));
    } catch (error) {
        callback({
            code: grpc.status.NOT_FOUND,
            message: "comment not found",
        }, null)

    }
}

async function remove(call, callback) {
    try {
        callback(null, await handlers.remove(call.request));
    } catch (error) {
        callback({
            code: grpc.status.NOT_FOUND,
            message: "comment not found",
        }, null)
    }
}

module.exports = {
    list,
    get,
    create,
    update,
    remove
}