const mongoose = require("mongoose");
const localMongoose = require("passport-local-mongoose");
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true,
    },
    phone:{
        type:String,
        required:true
    },

    status:{
        type:String,
    },
    pro:{
        type:Boolean,
    },
  username: {
    type: String,
  },

  provider: {
    type: String,
  },
//   email: {
//     type: String,
//     lowercase: true,
//     unique: true,
//     required: [true, "can't be blank"],
//     match: [/\S+@\S+\.\S+/, 'is invalid'],
//     index: true,
//   },
//   name: String,
//   avatar: String,
//   role: { type: String, default: 'USER' },
//   bio: String,
  // google
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  // fb
  facebookId: {
    type: String,
    unique: true,
    sparse: true,
  },
 token:{
   type:Object
 },
 verified:{
   type:Boolean,
   default:false
 },
 alreadyLoggedIn:{
   type:Boolean,
 },
 loggedInDeviceName:{
   type:String,
   required:true
 },
 IP_ADDRESS:{
   type:String,
   required:true
 }
});
const isProduction = process.env.NODE_ENV === 'production';

const secretOrKey = isProduction ? process.env.JWT_SECRET_PROD : process.env.JWT_SECRET_DEV;

userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      expiresIn: Math.floor(Date.now() / 1000) + (60 * 60),
      id: this._id,
      provider: this.provider,
      email: this.email,
      name: this.firstname,
      profile: this.profile
    },
    secretOrKey,
  );
  return token;
};

userSchema.plugin(localMongoose, { usernameField: 'email' });

const Users = mongoose.model("User", userSchema);
module.exports = Users;
