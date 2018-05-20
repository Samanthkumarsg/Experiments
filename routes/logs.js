const express = require('express');
const router = express.Router();

const LogCtrl = require('../controllers/logs');
const CheckAuth = require('../controllers/check-auth');

router.get("/", CheckAuth.checkAuthentication, LogCtrl.getAllLogs);
router.get("/:username", CheckAuth.checkAuthentication, LogCtrl.getLogsByUsername);

module.exports = router;