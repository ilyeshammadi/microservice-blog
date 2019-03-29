function login(_, { loginInput }, { dataSources }) {
    return dataSources.auth.login(loginInput);
}

function register(_, { registerInput }, { dataSources }) {
    return dataSources.users.create(registerInput);
}

async function createArticle(_, { createArticleInput }, { token, dataSources: { auth, ability, articles } }) {
    const user = await auth.authenticate(token);
    await ability.can({
        userId: user.id,
        action: 'create',
        subject: 'Article'
    });
    return articles.create({ authorId: user.id, ...createArticleInput });
}

async function updateArticle(_, { updateArticleInput }, { token, dataSources: { auth, ability, articles } }) {
    const user = await auth.authenticate(token);
    await ability.canOnInstance({
        userId: user.id,
        action: 'update',
        subject: 'Article',
        subjectId: updateArticleInput.id
    });
    return articles.update({ authorId: user.id, ...updateArticleInput });
};

async function deleteArticle(_, { deleteArticleInput }, { token, dataSources: { auth, ability, articles } }) {
    const user = await auth.authenticate(token);
    await ability.canOnInstance({
        userId: user.id,
        action: 'delete',
        subject: 'Article',
        subjectId: deleteArticleInput.id
    });
    return articles.remove({ authorId: user.id, ...deleteArticleInput })
}

module.exports = {
    login,
    register,
    createArticle,
    updateArticle,
    deleteArticle
}