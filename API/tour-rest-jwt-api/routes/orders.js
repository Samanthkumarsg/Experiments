const express = require('express');
const router = express.Router();

const OrdersCtrl = require('../controllers/orders');
const CheckAuth = require('../controllers/check-auth');

router.get("/", CheckAuth.checkAuthentication, OrdersCtrl.getAllOrders);
router.get("/:id", CheckAuth.checkAuthentication, OrdersCtrl.getOrderByID);
router.post("/", CheckAuth.checkAuthentication, OrdersCtrl.addOrder);
router.delete("/:id", CheckAuth.checkAuthentication, OrdersCtrl.deleteOrder);
router.patch("/:id", CheckAuth.checkAuthentication,OrdersCtrl.updateOrder);

module.exports = router;