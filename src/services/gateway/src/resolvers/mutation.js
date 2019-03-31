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

async function createComment(_, { createCommentInput }, { token, dataSources: { auth, ability, comments } }) {
    const user = await auth.authenticate(token);
    await ability.can({
        userId: user.id,
        action: 'create',
        subject: 'Comment'
    });
    return comments.create({ authorId: user.id, ...createCommentInput });
}

async function updateComment(_, { updateCommentInput }, { token, dataSources: { auth, ability, comments } }) {
    const user = await auth.authenticate(token);
    await ability.canOnInstance({
        userId: user.id,
        action: 'update',
        subject: 'Comment',
        subjectId: updateCommentInput.id
    });
    return comments.update({ authorId: user.id, ...updateCommentInput });
};

async function deleteComment(_, { deleteCommentInput }, { token, dataSources: { auth, ability, comments } }) {
    const user = await auth.authenticate(token);
    await ability.canOnInstance({
        userId: user.id,
        action: 'delete',
        subject: 'Comment',
        subjectId: deleteCommentInput.id
    });
    return comments.remove({ authorId: user.id, ...deleteCommentInput })
}


module.exports = {
    login,
    register,
    createArticle,
    updateArticle,
    deleteArticle,
    createComment,
    updateComment,
    deleteComment,
}