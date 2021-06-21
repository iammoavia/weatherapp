const express = require("express");
const router = express.Router();
router.use(express.json());
const { generateCode,resetPassword } = require('../Controllers/ForgotPasswordController');
router.post("/generatecode",generateCode);
router.post('/resetpassword',resetPassword);
module.exports = router;