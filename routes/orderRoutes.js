const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/')
    .post(createOrder)
    .get(protect, adminOnly, getOrders);

router.route('/:id')
    .delete(protect, adminOnly, deleteOrder);

router.route('/:id/status')
    .put(protect, adminOnly, updateOrderStatus);

module.exports = router;
