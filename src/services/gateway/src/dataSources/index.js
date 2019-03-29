module.exports = {
    AuthGRPCService: require('./grpcServices/auth'),
    AuthorizationGRPCService: require('./grpcServices/authorization'),
    UsersGRPCService: require('./grpcServices/users'),
    ArticlesGRPCService: require('./grpcServices/articles'),
    CommentsGRPCService: require('./grpcServices/comments'),
}