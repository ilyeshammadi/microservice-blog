const { Service } = require('../common/js/service');
const endpoints = require('./endpoints.js')
const events = require('./events');

new Service('comments', {
    endpoints,
    events
}).start()