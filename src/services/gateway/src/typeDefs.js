const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!
    username: String
    articles(paginator: Paginator): [Article]
    comments(paginator: Paginator): [Comment]
  }

  type Article {
    id: ID!
    title: String
    content: String
    authorId: String
    author: User!
    comments(paginator: Paginator): [Comment]
  }

  type Comment {
    id: ID!
    content: String
    authorId: ID
    author: User
    articleId: ID
    article: Article
  }

  input Paginator {
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
    users(paginator: Paginator): [User]
    article(id: ID!): Article
    articles(paginator: Paginator): [Article]
    comment(id: ID!): Comment
    comments(paginator: Paginator): [Comment]
  }

  type Mutation {
    login(loginInput: LoginInput!): LoginResponse
    register(registerInput: RegisterInput!): RegisterResponse
    
    createArticle(createArticleInput: CreateArticleInput!): CreateArticleResponse
    updateArticle(updateArticleInput: UpdateArticleInput!): UpdateArticleResponse
    deleteArticle(deleteArticleInput: DeleteArticleInput!): DeleteArticleResponse

    createComment(createCommentInput: CreateCommentInput!): CreateCommentResponse
    updateComment(updateCommentInput: UpdateCommentInput!): UpdateCommentResponse
    deleteComment(deleteCommentInput: DeleteCommentInput!): DeleteCommentResponse
  }
`; 