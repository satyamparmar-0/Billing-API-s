const Order = require('../models/orders');
const Product = require('../models/product');

exports.createOrder = async (req, res) => {
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
