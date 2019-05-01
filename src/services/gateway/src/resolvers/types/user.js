const { ForbiddenError } = require("apollo-server");

async function roles({ id }, _, { dataSources: { auth, ability }, token }) {
  const user = await auth.authenticate(token);
  // Reject if the logged in user is diffrent than requeted user
  if (user.id !== id) throw new ForbiddenError("permission error");
  return ability.getRoles({ userId: id });
}

module.exports = {
  articles: ({ id }, { paginate }, { dataSources: { articles } }) =>
    articles.list({ query: { authorId: id }, paginate }),
  comments: ({ id }, { paginate }, { dataSources: { comments } }) =>
    comments.list({ query: { authorId: id }, paginate }),
  roles
};
