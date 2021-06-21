const TrialRouter = require('../Controllers/TrialController');
const express = require("express");
const router = express.Router();
router.use(express.json());
router.post('/start-trial',TrialRouter.startTrial);
module.exports = router;