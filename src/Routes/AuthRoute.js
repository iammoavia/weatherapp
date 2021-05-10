const express = require("express");
const router = express.Router();
const AuthController = require("../Controllers/AuthController");
const AuthSchema = require("../Schemas/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { LoginValidation } = require("../Configuration/Validation/Validation");
const multer = require('multer');
const Users = require('../Schemas/UserSchema');
const Trial = require('../Schemas/TrialSchema');
router.use(express.json());
const passport = require('passport');
const moment = require('moment');
const session = require('express-session');
require('../Configuration/passport')(passport);

router.use(passport.initialize());
router.use(passport.session());

router.route("/register").post(AuthController.createAccount);
router.route("/users").get(AuthController.getAllAccounts);
// router.route('/save-token').posh(AuthController.savePushToken);
// router.route('/get-tokens').get(AuthController.getAllTokens);

router.route('/get-block-users').get(async(req,res) => {
  try {
    const blockedUsers = await AuthSchema.find({status:'BLOCKED'});
    res.status(200).json({
      success:true,
      Data:blockedUsers
    })
  } catch(e) {
    res.status(400).json({
      success:false,
      Message:'An error occured while fetching blocked users',
      error:e
    })
  }
})
router.route('/block-user/:userId').patch(async(req,res) => {
  try {
    const {reason} = req.body;
  if(!req.params.userId) {
    res.status(400).json({
      success:false,
      Message:'Please send the user id in order to block the user.',
      code:'DEVELOPER_ERROR',
    })
    return;
  } else if (!reason) {
    res.status(400).json({
      success:false,
      Message:'Please provide the reason.',
      code:'DEVELOPER_ERROR',
    })
    return;
  }
  const User = await AuthSchema.findById(req.params.userId);
  if(!User || User.length === 0 || User == null) { 
    res.status(404).json({
      success:false,
      Message:'No User exists on database with given Id',
      code:'DEVELOPER_ERROR',
    })
    return;
  } 
  const blockedUser = await AuthSchema.findByIdAndUpdate(req.params.userId,{
    status:'BLOCKED'
  },{
    new:true
  });
  res.status(200).json({
    success:true,
    Message:'The user was successfully blocked.',
    Data:blockedUser
  })
  } catch (error) {
    res.status(400).json({
      success:false,
      Message:'An error occured while blocking the user. Try again please.'
    })
  }

})

router.route('/unblock-user/:userId').patch(async(req,res) => {
  try {
  if(!req.params.userId) {
    res.status(400).json({
      success:false,
      Message:'Please send the user id in order to unblock the user.',
      code:'DEVELOPER_ERROR',
    })
    return;
  } 
  const User = await AuthSchema.findById(req.params.userId);
  if(!User || User.length === 0 || User == null) { 
    res.status(404).json({
      success:false,
      Message:'No User exists on database with given Id',
      code:'DEVELOPER_ERROR',
    })
    return;
  } 
  const unblockedUser = await AuthSchema.findByIdAndUpdate(req.params.userId,{
    status:'ACTIVE'
  });
  res.status(200).json({
    success:true,
    Message:'The user was successfully unblocked.'
  })
  } catch (error) {
    res.status(400).json({
      success:false,
      Message:'An error occured while unblocking the user. Try again please.'
    })
  }

})

// router.route('/get-blocked-users').get(async(req,res) => {

// })

// router.route('/change-password/:userId').patch(async(req,res) =>)

router.route('/generate-otp').post(async(req,res) => {
  const { Phone } = req.body
  let code = Math.floor(1000 + Math.random() * 9000);
  const existingUser = await Users.findOne({ phone: Phone });
  if (existingUser) {
   res.status(200).json({
     success:true,
     message:'The otp has been sent to your contact',
     OTP:code
   }) 

  } else {

    return res.status(400).json({ success: false, message: 'User is not registered' });
  }
})

router.post('/changepassword', function (req, res) {

  Users.findOne({ email: req.body.email }, (err, user) => {
    // Check if error connecting
    if (err) {
      res.json({ success: false, message: err }); // Return error
    } else {
      // Check if user was found in database
      if (!user) {
        res.json({ success: false, message: 'User not found' }); // Return error, user was not found in db
      } else {
        
        user.changePassword(req.body.oldpassword, req.body.newpassword, function (err) {
          if (err) {
            if (err.name === 'IncorrectPasswordError') {
              res.json({ success: false, message: 'Incorrect password' }); // Return error
            } else {
              res.json({ success: false, message: 'Something went wrong!! Please try again after sometimes.' });
            }
          } else {
            res.json({ success: true, message: 'Your password has been changed successfully' });
          }
        })
      }
    }
  });
});


router.post('/verify-account',async(req,res) => {
  try {
    if(!req.body.otp) {
      res.status(400).json({
        status:false,
        message:'Invalid or expired otp'
      });
      return;
    } else if(!req.body.userId) {
      res.status(400).json({
        status:false,
        message:'Please enter the user id'
      });
      return;
    }
    const user = await AuthSchema.find({_id:req.body.userId});
    if(!user) {
      res.status(400).json({
        success:false,
        message:'No user exists with this is'
      });
      return;
    }
      const updatedUser = await AuthSchema.findByIdAndUpdate(req.body.userId,{
        verified:true
      },{
        new:true
      });
      res.status(200).json({
        success:true,
        message:'This user has been successfully verified.',
        Data:updatedUser
      })
      
  } catch(e) {
    res.status(400).json({
      success:false,
      message:'An error occured while verifying user',
      Error:e
    })
  }
});



router.route('/edit-profile/:id').patch(async(req,res) => {
    try {
    const user = await Users.findByIdAndUpdate(req.params.id,req.body);
    const userToBeSent = await Users.find({_id:req.params.id});
    res.status(200).json({
      success:true,
      data:userToBeSent
    })
    } catch(e) {
      res.status(400).json({
        success:false,
        Error:e
      })
    }
})
router.post("/signup", async (req, res, next) => {
  const { email, password, firstname, lastname, status, phone,verified } = req.body;
  const existingUser = await Users.findOne({ email: email });
  const existingPhone = await Users.findOne({phone:phone});
  if(existingPhone) {
    return res.status(400).json({ success: false, message: 'Phone number already in use.' });
  }
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Email alredy taken.' });
  }

  Users.register(
    new Users({verified:false,profile:null,firstname:firstname,lastname:lastname,status:'ACTIVE',phone:phone,email: email, provider: 'email', username: 'user' + Math.floor(Math.random() * 6) }),
    password,
    (err, user) => {
      if (err) {
        res.json({ success: false, message: err.message });

      };
      user.save(async(err) => {
        if (err) return next(err);
        // res.setHeader("content-type", "application/json");
        // res.statusCode = 200;
        res.json({ success: true, message: "Signup successfully",data:[user] });
        var now = new Date();
        var duedate = new Date(now);
        duedate.setDate(now.getDate() + 2);
        const newdate = new Date();
        const formattedExpiry = moment(duedate).format('LLL');
        const formattedStarted = moment(newdate).format('LLL');
        const newTrial = new Trial({
          userId:user._id,
          trailStartedOn:formattedStarted,
          user:user,
          trialExpiration:formattedExpiry
        })
       await newTrial.save();
      });
    }
  );
});

router
  .route("/users/:id")
  .get(AuthController.getAccount)
  .delete(AuthController.deleteAccount)
  .patch(AuthController.EditAccount)

 
router.post("/login", async(req, res, next) => {
  passport.authenticate("local", async(err, user, info) => {

    if (err) return next(err);
    if (!user) {
      res.setHeader("content-type", "application/json");
      res.statusCode = 203;
      console.log(user);
      res.json({ success: false, message: "Login Un successfull", info: info});
      return;
    }
    req.logIn(user, { session: false }, async(err) => {
      if (err) {
        res.setHeader("content-type", "application/json");
        res.statusCode = 401;
        res.json({ success: false, message: "Login Un successfull", err: err });
        return;
      }
      res.setHeader("content-type", "application/json");
      res.statusCode = 200;
      const token = req.user.generateJWT();
      const user = await Users.find({email:req.body.email});
      if(user[0].verified == null || user[0].verified === false) {
        res.json({
          success:false,
          message:'Your account isnt verified please verify it to get ahead',
          code:'ACCOUNT_NOT_VERIFIED'
        });
        return;
      } else if (user[0].status === 'BLOCKED') {
        res.json({
          success:false,
          message:'Your account was blocked by admin for some reason. Contact the customer support.',
          code:'ACCOUNT_BLOCKED'
        });
        return;
      }
      res.json({ success: true, message: "Login Successfull", token,data:user });

    });
  })(req, res, next);
});



module.exports = router;