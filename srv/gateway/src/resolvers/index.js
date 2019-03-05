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
        comments: ({ id }) => comments.list({ articleId: id }),
    },
    User: {
        articles: ({ id }) => articles.list({ authorId: id }),
        comments: ({ id }) => comments.list({ authorId: id }),
    },
    Query: {
        user: (_, args) => users.get(args),
        users: () => users.list(),
        articles: () => articles.list(),
        article: (_, args) => articles.get(args),
        comments: () => comments.list(),
        comment: (_, args) => comments.get(args),
    },
    Mutation: {
        login: (_, { loginInput }) => auth.login(loginInput),
        register: (_, { registerInput }) => users.create(registerInput),
        createArticle: (_, { createArticleInput }, context) => authenticate(context, () => articles.create({ authorId: context.user.id, ...createArticleInput })),
    }
}