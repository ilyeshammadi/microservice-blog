const { Service } = require('../common/js/service');
const endpoints = require('./endpoints.js')

new Service('users', {
    endpoints
}).start()