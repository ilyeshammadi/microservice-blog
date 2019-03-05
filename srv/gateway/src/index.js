const { ApolloServer, AuthenticationError } = require('apollo-server');
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const { getUser } = require('./resolvers/auth');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || '';

    // try to retrieve a user with the token
    const user = await getUser(token);

    return { user };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});