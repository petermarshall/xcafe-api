const Query = require('./query');
const Mutation = require('./mutation');
const Amenity = require('./amenity');
const Note = require('./note');
const User = require('./user');
const { GraphQLDateTime } = require('graphql-iso-date');


module.exports = {
    Query,
    Mutation,
    Amenity,
    Note,
    User,
    DateTime: GraphQLDateTime
}