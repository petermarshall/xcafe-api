const  { gql } = require ('apollo-server-express');

module.exports = gql`
    scalar DateTime
type Amenity {
    id: ID
    amenityId: Int!
    category: String!
    favoriteCount: Int!
    favoritedBy: [User!]
    notes: [Note!]!
    scores : [Score!]
    createdAt: DateTime!
    updatedAt: DateTime!
}
type ScoreType {
    id: ID
    name: String!
}
type Score {
    id: ID
    user : User!
    scoreType : ScoreType!
    amenity : Amenity!
    value : Int!
    createdAt: DateTime!
    updatedAt: DateTime!
}
type Note {
    id: ID
    content: String!
    amenity: Amenity!
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
}
type User {
    id: ID!
    username: String!
    email: String!
    avatar: String!
    notes: [Note!]!
    scores: [Score!]
    favorites: [Amenity!]!
}
type Query{
    notes: [Note]!
    note(id: ID): Note!
    user(username: String): User
    users: [User!]!
    me: User!
}
type Mutation{
    newScoreType(name: String!): String!
    newNote(amenityId: Int!, category: String!, content: String!): String!
    updateNote(id: ID!, content: String!): Note!
    deleteNote(id: ID!): Boolean!
    signUp(username: String!, email:String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!
    toggleFavorite(id: ID!): Note!
}`;
