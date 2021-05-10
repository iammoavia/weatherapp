const Users = require('../Schemas/UserSchema');
var nodemailer = require('nodemailer');
exports.generateCode = async (req, res) => {
    const { email } = req.body
    let code = Math.floor(1000 + Math.random() * 9000);
    const existingUser = await Users.findOne({ email: email });
    if (existingUser) {
      res.status(200).json({
        success:true,
        message:'The otp has been sent',
        otp:code
      })
    //   var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     host: 'smtp.gmail.com',
    //     secure:true,
    //     auth: {
    //       user: 'isamadmemon20@gmail.com',
    //       pass: 'Roarmemon123'
    //     }
    //   });
    // var mailOptions = {
    //     from: 'isamadmemon20@gmail.com',
    //     to: email,
    //     subject: 'Forgot password activation code',
    //     text: `Dear User, This is your forget password verification code, ${code}.`
    //   };
      
    // transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //         return res.send({ message: error.toString(), success: false });
    //     } else {
    //         return res.json({ success: true, token: code });
    //     }
    //   });  
  
    } else {
  
      return res.status(400).json({ success: false, message: 'User is not registered' });
    }
  
  }
  exports.resetPassword = (req, res) => {
    const { email, newpassword } = req.body
    Users.findByUsername(email).then(function (sanitizedUser) {
      if (sanitizedUser) {
        sanitizedUser.setPassword(newpassword, function () {
          sanitizedUser.save();
          res.status(200).json({ message: 'password reset successful' });
        });
      } else {
        res.status(500).json({ message: 'This user does not exist' });
      }
    }, function (err) {
      console.error(err);
    })
  
  
  }