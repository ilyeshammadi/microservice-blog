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
    createArticle(createArticleInput: CreateArticleInput!): Article
    updateArticle(updateArticleInput: UpdateArticleInput!): Article
  }

`; 