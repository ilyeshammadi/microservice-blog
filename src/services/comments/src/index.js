const start = process.argv[2];

if (start === 'grpc') {
    const grpc = require('../common/js/grpc')
    const service = require('./endpoints.js')

    const PROTO_PATH = './common/proto/comments/service.proto';

    new grpc.Server({
        protoFilePath: PROTO_PATH,
        service
    }).start();

} else if (start === 'subscriber') {
    const { broker } = require('./events');
    broker.subscribe('commentsService');
}