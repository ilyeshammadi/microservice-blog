const { Service } = require('../common/js/service');
const endpoints = require('./endpoints.js')

new Service('articles', {
    endpoints,
}).start()