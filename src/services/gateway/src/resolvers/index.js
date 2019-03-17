const { authenticate } = require('../utils/authentification')

const articles = require('./articles')
const auth = require('./auth')
const users = require('./users')
const comments = require('./comments')


module.exports = {
    Comment: {
        author: ({ authorId }) => users.get({ id: authorId }),
        article: ({ articleId }) => articles.get({ id: articleId }),
    },
    Article: {
        author: ({ authorId }) => users.get({ id: authorId }),
        comments: ({ id }, { paginator }) => comments.list({ query: { articleId: id }, paginator }),
    },
    User: {
        articles: ({ id }, { paginator }) => articles.list({ query: { authorId: id }, paginator }),
        comments: ({ id }, { paginator }) => comments.list({ query: { authorId: id }, paginator }),
    },
    Query: {
        user: (_, args) => users.get(args),
        article: (_, args) => articles.get(args),
        comment: (_, args) => comments.get(args),
        users: (_, { paginator }) => users.list({ query: {}, paginator }),
        articles: (_, { paginator }) => articles.list({ query: {}, paginator }),
        comments: (_, { paginator }) => comments.list({ query: {}, paginator }),

    },
    Mutation: {
        login: (_, { loginInput }) => auth.login(loginInput),
        register: (_, { registerInput }) => users.create(registerInput),
        createArticle: (_, { createArticleInput }, context) => authenticate(context, () => articles.create({ authorId: context.user.id, ...createArticleInput })),
        updateArticle: (_, { updateArticleInput }, context) => authenticate(context, () => articles.update({ authorId: context.user.id, ...updateArticleInput })),
        deleteArticle: (_, { deleteArticleInput }, context) => authenticate(context, () => articles.remove({ authorId: context.user.id, ...deleteArticleInput })),
    }
}
