const { createGrpcClient } = require('./grpc.tool');

module.exports = {
    auth: createGrpcClient('auth'),
    authorization: createGrpcClient('authorization'),
    users: createGrpcClient('users'),
    articles: createGrpcClient('articles'),
    comments: createGrpcClient('comments'),
}