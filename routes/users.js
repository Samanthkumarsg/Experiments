const express = require('express');
const router = express.Router();

const UsersCtrl = require('../controllers/users');

router.get("/", UsersCtrl.getAllUsers);
router.get("/login/:id", UsersCtrl.loginUser);
router.post("/register", UsersCtrl.registerUser);

module.exports = router;