const mongoose = require('mongoose');
const Slipways = new mongoose.Schema({
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
  image:{
    type:String,
  }
})
module.exports = mongoose.model('Slipways',Slipways);
