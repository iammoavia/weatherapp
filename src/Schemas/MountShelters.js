const mongoose = require('mongoose');
const MountShelter = new mongoose.Schema({
latitude:{
    type:String,
    required:true
},
longitude:{
    type:String,
    required:true
},
altitude:{
    type:String,
    required:true
},
  addedOn:{
      type:Date,
  },
  name:{
      type:String,
      required:true
  },
  TEL:{
      type:String,
      required:true
  },
  seats:{
      type:String,
      required:true
  },
  image:{
      type:String
  }
})
module.exports = mongoose.model('MountShelter',MountShelter);
