const { signToken } = require('../utils/auth');
const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    helloWorld: () => {
      return 'Hello world!';
    },
    me: async (parent, { username }) => {
      return User.findOne({ username })
      .select('-__v -password')
      .populate('savedBooks');
    }
  }
  ,
  Mutation: {
      //create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);

        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if(!user) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const correctPw = await user.isCorrectPassword(password)

        if(!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const token = signToken(user);
        return { token, user };
        
      }
      }
    //     //login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
    //      // {body} is destructured req.body

    //     //save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
    //     // user comes from `req.user` created in the auth middleware function

    //      //remove a book from `savedBooks`

    // }
  };
  
  module.exports = resolvers;

//   Query: {
//     //get a single user by either their id or their username
//   me: async (parent, { username }) => {
//     return User.findOne({ username })
//       .select('-__v -password')
//       .populate('savedBooks');
//   }
// }