const grpc = require('grpc');
const handlers = require('./handlers');

function list(call, callback) {
    handlers.list(call.request).then((response) => callback(null, response));
}

function get(call, callback) {
    const id = call.request.id;
    handlers.get(id).then((res => callback(null, res)))
}

function create(call, callback) {
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