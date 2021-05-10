const mongoose = require('mongoose');
const MoonCalendar = new mongoose.Schema({
 image: {
     type:String,
 },
 addedOn:{
     type:String,
     default:new Date()
 },
 month:{
     type:String,
     required:true
 },
 year:{
     type:String,
     required:true
 }
//  moonPercent : {
//      type:String,
//      required:true
//  },
//  moonType: {
//      type:String,
//      required:true
//  }
})
module.exports = mongoose.model('MoonCalendar',MoonCalendar);
