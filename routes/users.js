const express = require('express');
const router = express.Router();

const UsersCtrl = require('../controllers/users');

router.get("/", UsersCtrl.getAllUsers);
router.get("/:username", UsersCtrl.getSingleUser);
router.post("/register", UsersCtrl.registerUser);
router.post("/login", UsersCtrl.loginUser);

module.exports = router;