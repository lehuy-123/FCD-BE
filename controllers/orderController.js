const Order = require('../models/Order');

// POST /api/orders
const createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        const createdOrder = await order.save();
        res.status(201).json({ message: "Order placed successfully!", orderId: createdOrder.id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET /api/orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status = req.body.status || order.status;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /api/orders/:id
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            await order.deleteOne();
            res.json({ message: "Order deleted successfully" });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createOrder, getOrders, updateOrderStatus, deleteOrder };
