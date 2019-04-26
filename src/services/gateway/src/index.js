const { ApolloServer } = require('apollo-server');
const { RedisCache } = require('apollo-server-cache-redis');

const { logger } = require('../common/js/tools')
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

const {
  AuthGRPCService,
  AuthorizationGRPCService,
  UsersGRPCService,
  ArticlesGRPCService,
  CommentsGRPCService,
} = require('./dataSources')


const REDIS_URL = process.env.REDIS_URL || 'redis://redis-master.dbs.svc.cluster.local'

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
    url: REDIS_URL
  }),
});


server.listen().then(({ url }) => {
  logger.info(`🚀 GraphQL server ready at ${url}`);
});