const mongoose = require('mongoose');
const PaymentSchema = new mongoose.Schema({
  userId:{
      type:String,
      required:true
  },
  paidOn:{
      type:String,
      required:true
  },
  expireAt: {
    type: Date,
    index: { expireAfterseconds: 31536000 },
  },
  user:{
    type:Object,
    required:true
  },
  expirationDate:{
    type:String,
    required:true
  }
})
module.exports = mongoose.model('PaymentSchema',PaymentSchema);
