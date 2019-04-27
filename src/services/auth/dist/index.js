"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("../common/js/service");
const endpoints = require("./endpoints");
new service_1.Service('auth', {
    endpoints,
}).start();
//# sourceMappingURL=index.js.map