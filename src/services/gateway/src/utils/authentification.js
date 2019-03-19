const { AuthenticationError } = require('apollo-server');

function authenticate(user, cb) {
    if (!user) throw new AuthenticationError("invalid credentials");
    return cb()
}

module.exports = {
    authenticate
}