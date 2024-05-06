const Payment = require('../models/payments')
const Order = require('../models/orders')
require('dotenv').config(); 
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeSecretKey)

const createPayment = async (req, res) => {
    try {
        const orderId = req.body.orderId;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found'});
        }
        const totalAmount = order.total_amount;

        const paymentIntent = await stripe.paymentIntents.create({ 
            amount: totalAmount*100, 
            currency: 'inr', 
            payment_method_types: ['card'],
            metadata: { orderId: order._id.toString() } 
        });
        const payment = new Payment({
            order_id: order._id,
            amount: totalAmount,
            payment_intent_id: paymentIntent.id
           
        });
        await payment.save();
        res.status(200).json({ success: true, client_secret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    createPayment
};