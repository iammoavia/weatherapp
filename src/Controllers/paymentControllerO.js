// var express = require('express');
// var request = require('request');
// // Add your credentials:
// // Add your client ID and secret
// var CLIENT =
//   'AUJoKVGO3q1WA1tGgAKRdY6qx0qQNIQ6vl6D3k7y64T4qh5WozIQ7V3dl3iusw5BwXYg_T5FzLCRguP8';
// var SECRET =
//   'EOw8LNwDhM7esrQ3nHfzKc7xiWnJc83Eawln4YLfUgivfx1LGzu9Mj0F5wlarilXDqdK9Q5aHVo-VGjJ';
// var PAYPAL_API = 'https://api-m.sandbox.paypal.com';

// exports.createPay = async(req,res) => {

//     var paymentID = 'PAYID-MCIX3BA7PB841048J851902K';
//     var payerID = 'TKC2ASZW6VAZS';
//     // 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
//     request.post(PAYPAL_API + '/v1/payments/payment/' + paymentID +
//       '/execute',
//       {
//         auth:
//         {
//           user: CLIENT,
//           pass: SECRET
//         },
//         body:
//         {
//           payer_id: payerID,
//           transactions: [
//           {
//             amount:
//             {
//               total: '10.99',
//               currency: 'USD'
//             }
//           }]
//         },
//         json: true
//       },
//       function(err, response)
//       {
//         if (err)
//         {
//           console.error(err);
//           return res.sendStatus(500);
//         }
//         // 4. Return a success response to the client
//         res.json(
//         {
//           status: 'success',
//           response
//         });
//       });


// }
const Payment = require('../Schemas/PaymentSchema');
const User = require('../Schemas/UserSchema');
const Trial = require('../Schemas/TrialSchema');
const moment = require('moment');
exports.createPayment = async (req, res) => {
    try {
        if (!req.body.userId || req.body.userId === '') {
            res.status(400).json({
                success: false,
                Message: 'Please provide the valid User Id'
            });
            return;
        }
        const userExists = await User.find({_id:req.body.userId});
        console.log(userExists);
        if (!userExists || userExists.length === 0 || userExists == null) {
            res.status(400).json({
                success: false,
                Message: 'No user exists with this id.'
            });
            return;
        }
        // const paymentExists = await Payment.find({ userId: req.body.userId });
        // console.log('payment-----------------',paymentExists)
        // if (paymentExists) {
        //     res.status(400).json({
        //         success: false,
        //         Message: 'Your payment already exists. Its not yet expired.'
        //     });
        //     return;
        // }
        var now = new Date();
        var duedate = new Date(now);
        duedate.setDate(now.getDate() + 365);
        const newdate = new Date();
        const formattedExpiry = moment(duedate).format('LLL');
        const formattedStarted = moment(newdate).format('LLL');
        const removeTrial = await Trial.findOneAndDelete({userId:req.body.userId});
        const newPay = new Payment({
            userId: req.body.userId,
            paidOn: formattedStarted,
            expirationDate: formattedExpiry,
            user: userExists,
            paymentMethod:req.body.paymentMethod,
            amountPaid:req.body.amountPaid,
            paymentId:req.body.paymentId
        })
        await newPay.save();
        res.status(200).json({
            success: true,
            Message: 'The payment was successfully saved.'
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            Message: 'An error occured while creating payment',
            Error:e
        })

    }
}

exports.getPaymentStatus = async (req, res) => {
    try {
        const Userr = await User.findById(req.params.userId);
        const payment = await Payment.find({ userId: req.params.userId });
        const Trials = await Trial.find({userId:req.params.userId});
        if(Trials != null && Trials.length !== 0 ) {
            res.status(200).json({
                success: true,
                status: "TRIAL",
                Message:'This user is in trial mode.',
                isBlocked:Userr.status === 'ACTIVE' ? false : true
            });
        }
        if (payment != null && payment.length !== 0) {
            res.status(200).json({
                success: true,
                Message: 'This user has annual subscription plan.',
                status: "ANNUAL_SUBSCRIBED",
                isBlocked:Userr.status === 'ACTIVE' ? false : true

            })
        }
        res.status(200).json({
            success: true,
            Message: 'This user neither have trial nor he has subscribed to annual plan',
            status: "NOT_SUBSCRIBED",
            isBlocked:Userr.status === 'ACTIVE' ? false : true

        })
    } catch (e) {
        res.status(400).json({
            success: false,
            Message: 'An error occured while fetching user payment status',
            
        })
    }
}
exports.getPayments = async (req, res) => {
    try {
        const payment = await Payment.find();
        const Trials = await Trial.find();
        res.status(200).json({
            success: true,
            payments: payment,
            trials:Trials,
            paymentCount:payment.length,
            TrialsCount:Trials.length
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            Message: 'An error occured while fetching payments',
        })
    }
}
exports.getPayment = async(req,res) => {
    try {
     const userId = req.params.userId;
     if(!userId || userId === '') {
         res.status(404).json({
             sucess:false,
             Message:'Please provide the user Id'
         });
         return;
     }
     const userPlan = await Payment.find({userId:req.params.userId});
     res.status(200).json({
         sucess:true,
         plan:userPlan
     })
    } catch(e) {
        res.status(400).json({
            sucess:false,
            Message:'An error occured while fetching the current paid plan.',
            Error:e
        })
    }
}