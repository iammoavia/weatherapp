const mongoose = require('mongoose');
const FavoritePlace = new mongoose.Schema({
  name:{
      type:String,
      required:true
  },
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
  userId:{
      type:String,
      required:true
  },
  user:{
      type:Object,
      required:true
  }
})
module.exports = mongoose.model('FavoritePlace',FavoritePlace);
