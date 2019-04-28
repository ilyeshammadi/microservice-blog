const Mutation = require("./mutation");
const User = require("./types/user");

module.exports = {
  Comment: {
    author: ({ authorId }, _, { dataSources: { users } }) =>
      users.get({ id: authorId }),
    article: ({ articleId }, _, { dataSources: { articles } }) =>
      articles.get({ id: articleId })
  },
  Article: {
    author: ({ authorId }, _, { dataSources: { users } }) =>
      users.get({ id: authorId }),
    comments: ({ id }, { paginate }, { dataSources: { comments } }) =>
      comments.list({ query: { articleId: id }, paginate })
  },
  User,
  Query: {
    user: (_, args, { dataSources: { users } }) => users.get(args),
    article: (_, args, { dataSources: { articles } }) => articles.get(args),
    comment: (_, args, { dataSources: { comments } }) => comments.get(args),
    users: (_, { paginate }, { dataSources: { users } }) =>
      users.list({ query: {}, paginate }),
    articles: (_, { paginate }, { dataSources: { articles } }) =>
      articles.list({ query: {}, paginate }),
    comments: (_, { paginate }, { dataSources: { comments } }) =>
      comments.list({ query: {}, paginate })
  },
  Mutation
};
