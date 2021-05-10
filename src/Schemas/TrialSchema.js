const mongoose = require('mongoose');
const TrialSchema = new mongoose.Schema({
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
  }
})
module.exports = mongoose.model('TrialSchema',TrialSchema);
