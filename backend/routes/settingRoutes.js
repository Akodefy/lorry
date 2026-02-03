const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController');

router.post('/verify-lock', settingController.verifyLockPassword);

module.exports = router;
