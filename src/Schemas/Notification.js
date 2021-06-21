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
NotificationSchema.index({createdAt:1},{expireAfterSeconds:172800});

module.exports = mongoose.model('NotificationSchema',NotificationSchema);
