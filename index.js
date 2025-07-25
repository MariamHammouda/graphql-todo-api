

// what does this mean {} ????????
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {typeDefs} from './schema.js'
import {resolvers} from './resolvers/resolvers.js'
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();


// to connect to database -------------
// it returns promise ----------------

mongoose.connect("mongodb://localhost:27017/TodoApp")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });


  // create instance from server :

const server = new ApolloServer ({

     typeDefs,
     resolvers,
     formatError:(err)=>{
      console.log(err);

      return {
        message:err.message,
        status:err.extensions.status || 500,
        code:err.extensions.code || "Internal server error"
      }; 
      
     }
    




});

// here why const {url} ? what does url refer to ??
// to start server :

   const {url} = await  startStandaloneServer(server,{
            listen :{
                port:4000
            },
              context: ({ req }) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return { user: null };
    }

    const decode = jwt.verify(authorization,process.env.SECRET)
    console.log(decode);
    return {
      user:decode,
    }
    

  }
      });

 
     console.log(url);
     
        