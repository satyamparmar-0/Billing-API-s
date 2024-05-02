const Payment = require('../models/payments')
const Order = require('../models/orders')
const Publishablekey = 'pk_test_51PBxZ8SHttKUoHIEiBVhe9shC4vuXPDMre4kKN4qqrG08LGGvoyAN5b9twusJKQ4x6aI29YdY4eanZDLYBRjRK9B00JhKlaKR1'
const Secret_key = 'sk_test_51PBxZ8SHttKUoHIETED0WUfvH4EZ7aFgFbR3HrNAv3mlUMld1yrwjkCSq8iCk7Ou6qaNfpMgCjvtLbFIEL281E1u00sqy0rlqg'
const stripe = require('stripe')(Secret_key)

const createPayment = async (req, res) => {
    try {
        const orderId = req.body.orderId;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }

        const totalAmount = order.total_amount;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount*100, 
            currency: 'inr', 
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