const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    scoreType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ScoreType',
        required: true
    },
    amenity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Amenity',
        required: true
    }
},{
    timestamps: true
});


const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
