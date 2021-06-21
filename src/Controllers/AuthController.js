const Auth = require("../Schemas/UserSchema");
const bcrypt = require("bcrypt");
const { registerValidation } = require("../Configuration/Validation/Validation");
const Notification = require('../Schemas/pushTokensSchema');
exports.createAccount = async (req, res) => {
  const { error } = registerValidation(req.body);
  if(error) {
    return res.status(400).json({
      Data:{
        Success:'fail',
        Message:error.details[0].message
      }
    })
  }
  const emailExists = await Auth.findOne({ email: req.body.email });
  const phoneExists = await Auth.findOne({ phone: req.body.phone });
  if(phoneExists) {
    return res.status(400).json({
      Data:{
        Success:'fail',
        Message:`An account with ${req.body.phone} already exists`
      }
    });
  }
  if (emailExists) {
    return res
      .status(400)
      .json({
        Data:{
          Success:'fail',
          Message:`An account with ${req.body.email} already exists.`
        }
      })
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const account = new Auth({
    email: req.body.email,
    password: hashedPassword,
    firstname: req.body.firstname,
    lastname:req.body.lastname,
    phone: req.body.phone,
  });
  try {
    const savedUser = await account.save();
    res.status(200).json({
      status: "Success",
      data: savedUser,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      data: e.message,
    });
  }
};

exports.EditAccount = async (req, res) => {
  const id = req.params.id;
  const editedAccount = await Auth.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  try {
    res.status(200).json({
      status: "Success",
      data: editedAccount,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      data: e.message,
    });
  }
};
exports.savePushToken = async(req,res) => {
  const newToken = new Notification({
    token:req.body.token
  });
  await newToken.save();
}
exports.getAllTokens = async(req,res) => {
  const allTokens = await Notification.find();
  res.status(200).json({
    success:true,
    tokens:allTokens
  })
}
exports.getAllAccounts = async (req, res) => {
  const accounts = await Auth.find();
  try {
    res.status(200).json({
      status: "Success",
      data: accounts,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      data: e.message,
    });
  }
};

exports.getAccount = async (req, res) => {
  const id = req.params.id;
  const foundAccount = await Auth.find({_id:id});
  console.log("🚀 ~ file: AuthController.js ~ line 93 ~ exports.getAccount= ~ foundAccount", foundAccount)
  const UserToBeSend = new Object({
    userId:foundAccount[0]._id,
    firstname:foundAccount[0].firstname,
    lastname:foundAccount[0].lastname,
    phone:foundAccount[0].phone,
    followers:foundAccount[0].followers,
    followings:foundAccount[0].followings,
    profile:foundAccount[0].profile ? foundAccount[0].profile : ''
  })
  console.log("🚀 ~ file: AuthController.js ~ line 100 ~ exports.getAccount= ~ UserToBeSend", UserToBeSend)
  try {
    res.status(200).json({
      status: "Success",
      data: UserToBeSend,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      data: e.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  const id = req.params.id;
  const deletedAccount = await Auth.findByIdAndRemove(id);
  try {
    res.status(200).json({
      status: "Success",
      data: deletedAccount,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      data: e.message,
    });
  }
};
