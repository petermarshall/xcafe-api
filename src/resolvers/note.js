module. exports = {
    // resolve the author info for a note when requested
    user: async (note, args, { models })=>{
        return await models.User.findById(note.user);
     } 
    // // resolve the favorited by info for a note when requested
    // favoritedBy: async (note, args, { models })=>{
    //     return await models.User.find({_id: { $in: note.favoritedBy}});
    // }
}