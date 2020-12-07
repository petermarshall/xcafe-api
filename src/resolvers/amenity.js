module. exports = {
    // resolve the author info for a note when requested
    // user: async (amenity, args, { models })=>{
    //     return await models.User.findById(amenity.user);
    //  },
    //  amenity: async (note, args, { models }) =>{
    //      return await models.Amenity.findById(note.amenity);
    //  },
    // resolve the favorited by info for a note when requested
    favoritedBy: async (amenity, args, { models })=>{
        return await models.User.find({_id: { $in: amenity.favoritedBy}});
    }
}