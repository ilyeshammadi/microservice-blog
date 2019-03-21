const grpc = require('../common/js/grpc')
const service = require('./endpoints.js')

const PROTO_PATH = './common/proto/authorization/service.proto';

new grpc.Server({
    protoFilePath: PROTO_PATH,
    service
}).start();
