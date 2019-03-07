const { each } = require('lodash');
const handlers = require('./handlers');


function list(call) {
    handlers.list(call.request).then(({ comments }) => {
        each(comments, comment => call.write(comment))
        call.end()
    });
}

function get(call, callback) {
    handlers.get(call.request).then((response) => callback(null, response))
}

function create(call, callback) {
    handlers.create(call.request).then(response => callback(null, response))
}

module.exports = {
    list,
    get,
    create,
}