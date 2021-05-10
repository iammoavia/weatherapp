const mongoose = require('mongoose');
const AirPorts = new mongoose.Schema({
  name:{
      type:String,
      required:true
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
  FAX:{
      type:String,
      required:true
  },
  email:{
      type:String,
      required:true
  },
  site:{
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
  }
})
module.exports = mongoose.model('AirPorts',AirPorts);
