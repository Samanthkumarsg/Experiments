const express = require('express');
const router = express.Router();

const OrdersCtrl = require('../controllers/orders');

router.get("/", OrdersCtrl.getAllOrders);
router.get("/:id", OrdersCtrl.getOrderByID);
router.post("/", OrdersCtrl.addOrder);
router.delete("/:id" , OrdersCtrl.deleteOrder);
router.patch("/:id" , OrdersCtrl.updateOrder);

module.exports = router;