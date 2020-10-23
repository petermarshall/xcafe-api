module.exports = {
    // resolve the list of notes for a user when requested
    notes: async (user, args, {models})=>{
        return await models.Note.find({user: user._id}).sort({_id: -1});
    },
    // resolve the list of favorites when requested
    favorites: async (user, args, {models})=>{
        return await models.Amenity.find({favoritedBy: user._id}).sort({_id: -1});
    }
}