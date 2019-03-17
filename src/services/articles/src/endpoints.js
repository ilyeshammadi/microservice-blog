const grpc = require('grpc');
const { each } = require('lodash');

const logger = require('../common/js/logger')
const events = require('../common/js/events')
const { Broker } = require('../common/js/broker')

const handlers = require('./handlers');

const broker = new Broker();

async function list(call) {
    const articles = await handlers.list(call.request);

    // Send each article and close the connection when it finishs
    each(articles, article => {
        call.write(article);
    })
    call.end();
}

async function get(call, callback) {
    try {
        callback(null, await handlers.get(call.request))
    } catch (error) {
        callback({
            code: grpc.status.NOT_FOUND,
            message: "article not found",
        }, null)
    }
}

async function create(call, callback) {
    try {
        callback(null, await handlers.create(call.request))
    } catch (error) {
        callback({
            code: grpc.status.INVALID_ARGUMENT,
            message: "can not create article",
        }, null)
    }
}

async function update(call, callback) {
    try {
        callback(null, await handlers.update(call.request));
    } catch (error) {
        callback({
            code: grpc.status.NOT_FOUND,
            message: "article not found",
        }, null)

    }
}

async function remove(call, callback) {
    try {
        callback(null, await handlers.remove(call.request));
    } catch (error) {
        callback({
            code: grpc.status.NOT_FOUND,
            message: "article not found",
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