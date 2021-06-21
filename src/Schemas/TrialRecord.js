const mongoose = require('mongoose');
const TrialRecord = new mongoose.Schema({
  userId:{
      type:String,
      required:true
  },
  trailStartedOn:{
      type:String,
      required:true
  },
  expireAt: {
    type: Date,
    index: { expireAfterSeconds: 172800 },
  },
  user:{
    type:Object
  },
  trialExpiration: {
    type:String,
    required:true
  },
  addedOn:{
    type:Date,
    required:true,
    default:new Date()
  }
})
module.exports = mongoose.model('TrialRecord',TrialRecord);

