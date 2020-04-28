const mongoose = require('mongoose');

const amenitySchema = new mongoose.Schema({
    category:{
        type: String,
        required: true
    },
    favoriteCount:{
        type: Number,
        default: 0
    },
    favoritedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},{
    timestamps: true
});


const Amenity = mongoose.model('Amenity',amenitySchema);

module.exports = Amenity;
