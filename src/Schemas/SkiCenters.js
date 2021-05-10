const mongoose = require('mongoose');
const SkiCenters = new mongoose.Schema({
  name:{
      type:String,
      required:true
  },
latitude:{
    type:String,
    required:true
},
longitude:{
    type:String,
    required:true
},
  addedOn:{
      type:Date,
  },
  address:{
    type:String,
    required:true
  },
  zipCode:{
    type:String,
    required:true
  },
  TEL:{
    type:String,
    required:true
  },
  site:{
    type:String,
    required:true
  }
})
module.exports = mongoose.model('SkiCenters',SkiCenters);
