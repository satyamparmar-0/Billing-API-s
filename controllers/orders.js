const Order = require('../models/orders');
const Product = require('../models/product');
const User = require('../models/user');

const createOrder = async (req, res) => {
    try {
        const { user_id, items, status } = req.body;
        let orderItems = [];
        for (const item of items) {
            const { product_id, quantity } = item;
            const product = await Product.findById(product_id);

            if (!product) {
                return res.status(404).json({ error: `Product with ID ${product_id} not found` });
            }
            const price = product.price * quantity;
            orderItems.push({
                product_id,
                product_name: product.name,
                quantity,
                price
            });
        }

        const totalAmount = orderItems.reduce((total, item) => total + item.price, 0);
        const newOrder = new Order({
            user_id,
            items: orderItems,
            total_amount: totalAmount,
            status
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        
    }
};

const updateOrder = async (req, res) => {
    try {
        const { order_id, user_id, items, status } = req.body;

    
        const existingOrder = await Order.findById(order_id);
        if (!existingOrder) {
            return res.status(404).json({ error: "Order not found" });
        }
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {
            const { product_id, quantity } = item;
            const product = await Product.findById(product_id);
            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }

            const price = product.price * quantity;
            totalAmount += price;

            orderItems.push({
                product_id,
                product_name: product.name,
                quantity,
                price
            });
        }
        existingOrder.user_id = user_id;
        existingOrder.items = orderItems;
        existingOrder.total_amount = totalAmount;
        existingOrder.status = status;

        // Save the updated order
        await existingOrder.save();
        res.status(200).json({ message: 'Order updated successfully', order: existingOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllOrdersByUserId = async (req, res) => {
    const { user_id } = req.body;
    try {
        const orders = await Order.find({ user_id });
        if (!orders) {
            return res.status(404).json("No Orders Found for this User");
        }
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    updateOrder,
    createOrder,
    getAllOrdersByUserId,
}