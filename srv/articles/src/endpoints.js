const handlers = require('./handlers');


function list(call, callback) {
    handlers.list(call.request).then((response) => callback(null, response));
}

function get(call, callback) {
    handlers.get(call.request).then((response) => callback(null, response))
}

function create(call, callback) {
    handlers.create(call.request).then(response => callback(null, response))
}

function update(call, callback) {
    handlers.update(call.request).then(response => callback(null, response))
}

function remove(call, callback) {
    handlers.remove(call.request).then(response => callback(null, response))
}

module.exports = {
    list,
    get,
    create,
    update,
    remove
}