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
type NoteFeed {
    notes: [Note]!
    cursor: String!
    hasNextPage: Boolean!
}

type Query{
    notes: [Note]!
    note(id: ID): Note!
    user(username: String): User
    users: [User!]!
    me: User!
    scoreTypes: [ScoreType!]!
    noteFeed(cursor: String): NoteFeed
    amenity(amenityId: Int): Amenity!
}
type Mutation{
    newScore(amenityId: Int!, category: String!, scoreType: String!, value: Int!): String!
    newScoreType(name: String!): String!
    newNote(amenityId: Int!, category: String!, content: String!): String!
    updateNote(id: ID!, content: String!): Note!
    deleteNote(id: ID!): Boolean!
    signUp(username: String!, email:String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!
    toggleFavorite(amenityId: Int!, category: String!): Amenity!
}`;
