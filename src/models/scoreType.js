const mongoose = require('mongoose');

const scoreTypeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
},{
    timestamps: true
});


const ScoreType = mongoose.model('ScoreType',scoreTypeSchema);

module.exports = ScoreType;
