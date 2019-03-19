const { authenticate } = require('./utils/authentification')

module.exports = {
    Comment: {
        author: ({ authorId }, _, { dataSources }) => dataSources.users.get({ id: authorId }),
        article: ({ articleId }, _, { dataSources }) => dataSources.articles.get({ id: articleId }),
    },
    Article: {
        author: ({ authorId }, _, { dataSources }) => dataSources.users.get({ id: authorId }),
        comments: ({ id }, { paginator }, { dataSources }) => dataSources.comments.list({ query: { articleId: id }, paginator }),
    },
    User: {
        articles: ({ id }, { paginator }, { dataSources }) => dataSources.articles.list({ query: { authorId: id }, paginator }),
        comments: ({ id }, { paginator }, { dataSources }) => dataSources.comments.list({ query: { authorId: id }, paginator }),
    },
    Query: {
        user: (_, args, { dataSources }) => dataSources.users.get(args),
        article: (_, args, { dataSources }) => dataSources.articles.get(args),
        comment: (_, args, { dataSources }) => dataSources.comments.get(args),
        users: (_, { paginator }, { dataSources }) => dataSources.users.list({ query: {}, paginator }),
        articles: (_, { paginator }, { dataSources }) => dataSources.articles.list({ query: {}, paginator }),
        comments: (_, { paginator }, { dataSources }) => dataSources.comments.list({ query: {}, paginator }),

    },
    Mutation: {
        login: (_, { loginInput }, { dataSources }) => dataSources.auth.login(loginInput),
        register: (_, { registerInput }, { dataSources }) => dataSources.users.create(registerInput),
        createArticle: (_, { createArticleInput }, { dataSources, user }) => authenticate(user, () => dataSources.articles.create({ authorId: user.id, ...createArticleInput })),
        updateArticle: (_, { updateArticleInput }, { dataSources, user }) => authenticate(user, () => dataSources.articles.update({ authorId: user.id, ...updateArticleInput })),
        deleteArticle: (_, { deleteArticleInput }, { dataSources, user }) => authenticate(user, () => dataSources.articles.remove({ authorId: user.id, ...deleteArticleInput })),
    }
}
