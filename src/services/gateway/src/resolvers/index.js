const Mutation = require('./mutation');

module.exports = {
    Comment: {
        author: ({ authorId }, _, { dataSources: { users } }) => users.get({ id: authorId }),
        article: ({ articleId }, _, { dataSources: { articles } }) => articles.get({ id: articleId }),
    },
    Article: {
        author: ({ authorId }, _, { dataSources: { users } }) => users.get({ id: authorId }),
        comments: ({ id }, { paginator }, { dataSources: { comments } }) => comments.list({ query: { articleId: id }, paginator }),
    },
    User: {
        articles: ({ id }, { paginator }, { dataSources: { articles } }) => articles.list({ query: { authorId: id }, paginator }),
        comments: ({ id }, { paginator }, { dataSources: { comments } }) => comments.list({ query: { authorId: id }, paginator }),
    },
    Query: {
        user: (_, args, { dataSources: { users } }) => users.get(args),
        article: (_, args, { dataSources: { articles } }) => articles.get(args),
        comment: (_, args, { dataSources: { comments } }) => comments.get(args),
        users: (_, { paginator }, { dataSources: { users } }) => users.list({ query: {}, paginator }),
        articles: (_, { paginator }, { dataSources: { articles } }) => articles.list({ query: {}, paginator }),
        comments: (_, { paginator }, { dataSources: { comments } }) => comments.list({ query: {}, paginator }),

    },
    Mutation
}
