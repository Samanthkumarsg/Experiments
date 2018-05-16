const express = require('express');
const router = express.Router();

const OrdersCtrl = require('../controllers/orders');

router.get("/", OrdersCtrl.getAllOrders);

module.exports = router;