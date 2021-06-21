const {getPayments,getPaymentStatus, createPayment,getPayment} = require('../Controllers/paymentController');
const express = require("express");
const router = express.Router();
router.use(express.json());
router.post('/create-payment',createPayment);
router.get('/get-payment-status/:userId',getPaymentStatus);
router.get('/get-payments',getPayments)
router.get('/my-current-plan/:userId',getPayment);
module.exports = router;