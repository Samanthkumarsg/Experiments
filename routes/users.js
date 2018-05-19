const express = require('express');
const router = express.Router();

const UsersCtrl = require('../controllers/users');
const CheckAuth = require('../controllers/check-auth');

router.post("/register", CheckAuth.checkAuthentication, UsersCtrl.registerUser);
router.post("/login", CheckAuth.checkAuthentication, UsersCtrl.loginUser);
router.get("/", CheckAuth.checkAuthentication, UsersCtrl.getAllUsers);
router.get("/:username", CheckAuth.checkAuthentication, UsersCtrl.getSingleUser);
router.delete("/:username", CheckAuth.checkAuthentication, UsersCtrl.deleteUser);
router.patch("/:username", CheckAuth.checkAuthentication, UsersCtrl.updateUser);

module.exports = router;