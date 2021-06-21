const mongoose = require('mongoose');
const pushTokenSchema = new mongoose.Schema({
   token:{
       type:String,
       required:true
   }
})
module.exports = mongoose.model('pushTokenSchema',pushTokenSchema);
