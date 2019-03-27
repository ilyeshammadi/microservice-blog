const { ApolloServer } = require('apollo-server');
const { RedisCache } = require('apollo-server-cache-redis');

const logger = require('../common/js/logger')
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

const {
  AuthGRPCService,
  UsersGRPCService,
  ArticlesGRPCService,
  CommentsGRPCService,
} = require('./dataSources')


const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    auth: new AuthGRPCService(),
    users: new UsersGRPCService(),
    articles: new ArticlesGRPCService(),
    comments: new CommentsGRPCService()
  }),
  context: async ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || '';

    // try to retrieve a user with the token
    const auth = new AuthGRPCService();
    const user = await auth.getUser(token);

    return { user };
  },
  cache: new RedisCache({
    host: 'redis'
  }),
});

server.listen().then(({ url }) => {
  logger.info(`🚀 GraphQL server ready at ${url}`);
});