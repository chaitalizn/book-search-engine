const { signToken } = require('../utils/auth');
const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (_, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('savedBooks')
    
        return userData;
      }

      throw new AuthenticationError('Not logged in');
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

      //login a user, sign a token, and send it back (to client/src/components/LoginForm.js)

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
        
      },
      //save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
      saveBook: async (_, {info}, context) => {
        if(context.user) {
          const user = await User.findByIdAndUpdate(
            context.user._id,
            {$addToSet: { saveBooks: info}},
            {new: true, runValidators: true}
          );

          return user;
        }
        throw new AuthenticationError('You need to be logged in!')
      }
    
      }
  
    
         //remove a book from `savedBooks`

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

