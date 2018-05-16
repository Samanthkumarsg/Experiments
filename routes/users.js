const express = require('express');
const router = express.Router();

const UsersCtrl = require('../controllers/users');

router.get("/", UsersCtrl.getAllUsers);

module.exports = router;