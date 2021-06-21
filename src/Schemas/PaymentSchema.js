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
  },
  expirationDate:{
    type:String,
    required:true
  },
  paymentMethod:{
    type:String,
    required:true
  },
  amountPaid:{
    type:String,
    required:true
  },
  paymentId:{
    type:String,
    required:true
  }

})
PaymentSchema.index({paidOn:1},{expireAfterSeconds:31536000});

module.exports = mongoose.model('PaymentSchema',PaymentSchema);
