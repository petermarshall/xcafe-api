// index.js
// This is the main entry point of our application
require('dotenv').config();
const helmet = require('helmet');
const jwt = require ('jsonwebtoken');
const db = require('./db');
const  {ApolloServer } = require ('apollo-server-express');
const port = process.env.PORT || 4000; 
const DB_HOST = process.env.DB_HOST;
const cors = require('cors');
const express = require('express');
const app = express();
app.use(helmet());
app.use(cors());
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');


db.connect(DB_HOST);



const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context: ({req}) => {
        // get the user token from the headers
        const token = req.headers.authorization;
        // try to retrieve a user with the token
        const user = getUser(token);
        //console.log(user);

        // add the db models to the context
        return {models, user};
    }});
    
server.applyMiddleware({app, path: `/api`});

app.listen({port}, () => console.log(`i am graphql`));

const getUser = token => {
    if (token){
        try{
            // return user information from the token
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch(err){
            throw new Error('user token invalid');
        }
    }
}

//app.get('/',(req, res) => res.send('<h1>hello pcdfbfdfsdfeter</h1>'));

//app.listen(port, ()=> console.log(`listening on port ${port}`));

