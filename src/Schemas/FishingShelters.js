const mongoose = require('mongoose');
const FishingShelter = new mongoose.Schema({
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    addedOn: {
        type: Date,
    }
})
module.exports = mongoose.model('FishingShelter', FishingShelter);
