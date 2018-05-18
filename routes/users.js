const express = require('express');
const router = express.Router();

const UsersCtrl = require('../controllers/users');

router.post("/register", UsersCtrl.registerUser);
router.post("/login", UsersCtrl.loginUser);

router.get("/", UsersCtrl.getAllUsers);
router.get("/:username", UsersCtrl.getSingleUser);
router.delete("/:username", UsersCtrl.deleteUser);

module.exports = router;