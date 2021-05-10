const mongoose = require('mongoose');
const KiteSurfing = new mongoose.Schema({
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
      default:new Date()
  },
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
  site:{
      type:String,
      required:true
  }

})
module.exports = mongoose.model('KiteSurfing',KiteSurfing);
