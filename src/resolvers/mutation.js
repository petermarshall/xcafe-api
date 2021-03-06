
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();
const gravatar = require('../util/gravatar');

module.exports = {
    newScore: async (parent, args, { models, user }) => {
        // check user is passed in
        if(!user){
            throw new AuthenticationError('user required to create new score.');
        }
        
        let amenity = await models.Amenity.find({ amenityId: args.amenityId});
        if(amenity.length == 0){
            // we need to create the amenity, it does not exist yet
            amenity = await models.Amenity.create({
                amenityId: args.amenityId,
                category: args.category
            })
        }
        const scoreType = await models.ScoreType.find({name: args.scoreType});
        if(scoreType.length == 0){
            return "Score type id is not valid";
        }

       const createdScore = await models.Score.create({
            amenity: mongoose.Types.ObjectId(amenity.id),
            value: args.value,
            content: args.content,
            scoreType:  mongoose.Types.ObjectId(scoreType.id),
            user: mongoose.Types.ObjectId(user.id)
        });
        return "SUCCESS";
    },
    newScoreType: async (parent, args, { models, user }) => {
        // check user is passed in
        if(!user){
            throw new AuthenticationError('user required to create new note.');
        }
        let scoreType = await models.ScoreType.find({ name: args.name});
        if(scoreType.length == 0){
            // we need to create the scoretype, it does not exist yet
            scoreType = await models.ScoreType.create({
                name: args.name
            });
            return "SUCCESS";
        }else{
            return "FAILED - score type already exists."
        }
     
    },
        newNote: async (parent, args, { models, user }) => {
            // check user is passed in
            if(!user){
                throw new AuthenticationError('user required to create new note.');
            }
            let amenity = await models.Amenity.find({ amenityId: args.amenityId});
            if(amenity.length == 0){
                // we need to create the amenity, it does not exist yet
                amenity = await models.Amenity.create({
                    amenityId: args.amenityId,
                    category: args.category
                })
            }
           const createdNote = await models.Note.create({
                amenity: mongoose.Types.ObjectId(amenity.id),
                content: args.content,
                user: mongoose.Types.ObjectId(user.id)
            });
            return "SUCCESS";
        },
        deleteNote: async (parent, { id }, { models, user }) =>{
            
            if(!user){
                throw new AuthenticationError('you must be signed in to delete a note');
            }

            const note = await models.Note.findById({ _id: id});
            // make sure the note is being deleted by the owner
            if(note){

                if(String(note.author) !== user.id){
                throw new ForbiddenError('You dont have permissions to delete this note');
                }
            
                try{
                    await note.remove();

                    return true;
                }catch(err){
                    return false;
                }
            }
        },
        updateNote: async (parent, {content, id},{models, user}) =>{
            if(!user){
                throw new AuthenticationError('you must be signed in to update a note');
            }
            const note = await models.Note.findById({ _id: id});
            if(note && String(note.user) !== user.id){
                throw new ForbiddenError('You dont have permissions to update this note');
            }

            return await models.Note.findOneAndUpdate(
                {
                    _id: id,
                },
                {
                    $set: { 
                        content
                    }
                },
                {
                    new: true
                }
            );
        },
        signUp: async (parent, { username, email, password }, { models }) =>{
            email = email.trim().toLowerCase();
            const hashed = await bcrypt.hash(password,10);
            const avatar = gravatar(email);
            try{
                const user = await models.User.create({
                    username,email,avatar,password: hashed
                });
                return jwt.sign({id: user._id},process.env.JWT_SECRET);

            }catch(err){
                console.log(err);
                throw new Error('Error creating account');
            }
        },
        signIn: async (parent, {username, email, password}, {models}) =>{
          if(email){
              email = email.trim().toLowerCase();
          }  
          const user = await models.User.findOne({
              $or: [{email}, {password}]
          });
          if(!user){
              throw new AuthenticationError('User not found');
          }
          const valid = await bcrypt.compare(password, user.password);
          if(!valid){
              throw new AuthenticationError('Invalid password');
          }

          return jwt.sign({id: user._id}, process.env.JWT_SECRET);
        },
        toggleFavorite: async (parent, args, {models, user})=>{
            if(!user){
                throw new AuthenticationError('must be signed in to toggle favorite');
            }
            let amenity = await models.Amenity.findOne({ amenityId:args.amenityId},
                function(err, obj){
                    console.log(obj);
                });
            if(!amenity){
                // we need to create the amenity, it does not exist yet
                amenity = await models.Amenity.create({
                    amenityId: args.amenityId,
                    category: args.category
                })
            }

            const hasUser = amenity.favoritedBy.indexOf(user.id);
            // if the user is in the list pull them from the list
            // and decrement the count
            if(hasUser >=0){
                return await models.Amenity.findByIdAndUpdate(
                    amenity.id,
                    {
                        $pull:{
                            favoritedBy: mongoose.Types.ObjectId(user.id)
                        },
                        $inc:{
                            favoriteCount: -1
                        }
                    },
                    {
                        new : true
                    }
                );
                
            } else {
                // if the user doesnt exist in the list
                // add them to the list and incrment the count
                return await models.Amenity.findByIdAndUpdate(
                    amenity.id,
                    {
                        $push:{
                            favoritedBy: mongoose.Types.ObjectId(user.id)
                        },
                        $inc: {
                            favoriteCount: 1
                        }
                    },
                    {
                        new : true
                    }
                );
            }
        }
    }
