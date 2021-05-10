const {getPayments,getPaymentStatus, createPayment} = require('../Controllers/paymentController');
const express = require("express");
const router = express.Router();
router.use(express.json());
router.post('/create-payment',createPayment);
router.get('/get-payment-status/:userId',getPaymentStatus);
router.get('/get-payments',getPayments)
module.exports = router;