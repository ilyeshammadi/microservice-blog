const grpc = require('grpc');
const { each } = require('lodash');
const handlers = require('./handlers');

function list(call) {
    handlers.list(call.request).then(({ users }) => {
        each(users, user => {
            call.write(user);
        })
        call.end()
    }).catch(err => {
        throw err
    });
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