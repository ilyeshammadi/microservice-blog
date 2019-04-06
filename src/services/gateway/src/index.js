const { ApolloServer } = require('apollo-server');
const { RedisCache } = require('apollo-server-cache-redis');

const { logger } = require('../common/js/logger')
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

const {
  AuthGRPCService,
  AuthorizationGRPCService,
  UsersGRPCService,
  ArticlesGRPCService,
  CommentsGRPCService,
} = require('./dataSources')


const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    auth: new AuthGRPCService(),
    ability: new AuthorizationGRPCService(),
    users: new UsersGRPCService(),
    articles: new ArticlesGRPCService(),
    comments: new CommentsGRPCService()
  }),
  context: async ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || '';
    return { token };
  },
  cache: new RedisCache({
    host: 'redis'
  }),
});

server.listen().then(({ url }) => {
  logger.info(`🚀 GraphQL server ready at ${url}`);
});