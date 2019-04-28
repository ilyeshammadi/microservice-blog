const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    username: String
    articles(paginate: Paginate): [Article]
    comments(paginate: Paginate): [Comment]
    roles: [Role]
  }

  type Role {
    id: ID!
    type: String!
    permissions: [Permission]
  }

  type Permission {
    subject: Subject!
    actions: [String]
  }

  type Subject {
    name: String!
    conditionFieldName: String
  }

  type Article {
    id: ID!
    title: String
    content: String
    authorId: String
    author: User!
    comments(paginate: Paginate): [Comment]
  }

  type Comment {
    id: ID!
    content: String
    authorId: ID
    author: User
    articleId: ID
    article: Article
  }

  input Paginate {
    page: Int
    limit: Int
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type LoginResponse {
    token: String
  }

  type RegisterResponse {
    id: ID
    username: String
  }

  type CreateArticleResponse {
    article: Article
  }

  type UpdateArticleResponse {
    article: Article
  }

  type DeleteArticleResponse {
    article: Article
    ok: Boolean!
  }

  type CreateCommentResponse {
    comment: Comment
  }

  type UpdateCommentResponse {
    comment: Comment
  }

  type DeleteCommentResponse {
    comment: Comment
    ok: Boolean!
  }

  input RegisterInput {
    username: String!
    password: String!
  }

  input CreateArticleInput {
    title: String!
    content: String!
  }

  input UpdateArticleInput {
    id: ID!
    title: String
    content: String
  }

  input DeleteArticleInput {
    id: ID!
  }

  input CreateCommentInput {
    content: String!
    articleId: ID!
  }

  input UpdateCommentInput {
    id: ID!
    content: String
  }

  input DeleteCommentInput {
    id: ID!
  }

  type Query {
    user(id: ID!): User
    users(paginate: Paginate): [User]
    article(id: ID!): Article
    articles(paginate: Paginate): [Article]
    comment(id: ID!): Comment
    comments(paginate: Paginate): [Comment]
  }

  type Mutation {
    login(loginInput: LoginInput!): LoginResponse
    register(registerInput: RegisterInput!): RegisterResponse

    createArticle(
      createArticleInput: CreateArticleInput!
    ): CreateArticleResponse
    updateArticle(
      updateArticleInput: UpdateArticleInput!
    ): UpdateArticleResponse
    deleteArticle(
      deleteArticleInput: DeleteArticleInput!
    ): DeleteArticleResponse

    createComment(
      createCommentInput: CreateCommentInput!
    ): CreateCommentResponse
    updateComment(
      updateCommentInput: UpdateCommentInput!
    ): UpdateCommentResponse
    deleteComment(
      deleteCommentInput: DeleteCommentInput!
    ): DeleteCommentResponse
  }
`;
