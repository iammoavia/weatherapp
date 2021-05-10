const mongoose = require('mongoose');
const NotificationSchema = new mongoose.Schema({

  title:{
      type:String,
      required:true
  },
  expireAt: {
    type: Date,
    index: { expireAfterSeconds: 172800 },
  },
  body:{
    type:String,
    required:true
  },
  createdOn: {
    type:Date,
    default:new Date()
  }
})
module.exports = mongoose.model('NotificationSchema',NotificationSchema);
