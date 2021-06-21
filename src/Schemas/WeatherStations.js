const mongoose = require('mongoose');
const WeatherStation = new mongoose.Schema({
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
 url:{
   type:String,
   required:true
 },
  addedOn:{
      type:Date,
      default:new Date()
  }
})
module.exports = mongoose.model('WeatherStation',WeatherStation);
