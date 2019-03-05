const { AuthenticationError } = require('apollo-server');

function authenticate(context, cb) {
    if (!context.user) throw new AuthenticationError("invalid credentials");
    return cb()
}

module.exports = {
    authenticate
}