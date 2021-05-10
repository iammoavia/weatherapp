const mongoose = require('mongoose');
const PassengerPort = new mongoose.Schema({
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
  }
})
module.exports = mongoose.model('PassengerPort',PassengerPort);
