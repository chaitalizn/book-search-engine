// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
type User {
  _id: ID
  username: String
  email: String
  bookCount: Int
  savedBooks: [Book]
}

type Book {
  bookId: String
  authors: [String]
  description: String
  title: String
  image: Boolean
  link: String
}

type Auth {
  token: ID!
  user: User
}

input BookInfoInput {
  authors: [String]
  description: String
  title: String!
  bookId: String
  image: String
  link: String
}

type Query {
  me: User
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveBook(info: BookInfoInput!): User
  removeBook(bookId: String!): User

}

`;
// export the typeDefs
module.exports = typeDefs;



