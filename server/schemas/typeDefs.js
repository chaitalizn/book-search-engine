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
  bookId(bookId: String): Book
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

type Query {
  helloWorld: String
  me: User
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
}

`;
// export the typeDefs
module.exports = typeDefs;

// type Mutation: {
//   login(email: String!, password: String!): Auth
//   addUser(username: String!, email: Sting!, password: String!): Auth
// }


// type Auth {
//   token: String
//   user: User
// }



// type Query {
//     me: User
//   }

//   `;