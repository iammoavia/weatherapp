const mongoose = require('mongoose');
const FishingPoints = new mongoose.Schema({
  userId:{
      type:String,
      required:true
  },
  catchName:{
      type:String,
      required:true
  },
  weight:{
      type:String,
      required:true
  },
//   user:{
//       type:Object,
//       required:true
//   },
//   address:{
//       location:{
//           type:String,
//           required:true
//       },
//       city:{
//           type:String,
//           required:true
//       },
//       country:{
//           type:String,
//           required:true
//       },
//       required:true
//   },
//   coordinates:{
//       latitude:{
//           type:String,
//           required:true
//       },
//       longitude:{
//           type:String,
//           required:true
//       },
//       required:true
//   },
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
      required:true
  },
  image:{
      type:String
  }
})
module.exports = mongoose.model('FishingPoints',FishingPoints);
