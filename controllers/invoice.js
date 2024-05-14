const Order = require('../models/orders');
const User = require('../models/user');
const Invoice = require('../models/invoice');
var easyinvoice = require('easyinvoice');
const fs = require('fs')
const createInvoice = async (req, res) => {
    try {
        const { order_id, user_id,GST } = req.body;
        const order = await Order.findById(order_id).populate('items.product_id'); 
        const user = await User.findById(user_id);

        if (!order || !user) {
            return res.status(404).json({ message: "User or Order not found" });
        }

        const orderList = order.items.map(item => ({
            product_id: item.product_id._id,
            quantity: item.quantity,
            price: item.price,
            product_name: item.product_name
        }));

        const total_amount = order.total_amount;
        const gst = (total_amount * GST) / 100;
        const total_amount_with_gst = total_amount + gst;
        const invoice = new Invoice({
            order_id,
            user_id,
            items: orderList,
            total_amount:total_amount_with_gst,
            GST:gst
        });

        await invoice.save();
        
        const data = {
            products: orderList
        };
        
        easyinvoice.createInvoice(data, async function (result) {
            try {
                await fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
                res.status(200).json({ success: true, message: "Invoice created successfully" });
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: "Error creating PDF invoice" });
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getInvoice = async(req,res)=>{
    try {
        const invoice = await Invoice.find();
        res.status(200).json({message:"True",data:invoice});
    } catch (error) {
        res.status(500).json({success:"false",message:"Invoice Not Found"});
    }
}

const getByUser = async(req,res)=>{
    const {user_id} = req.body;
    try{
        const user = await Invoice.find({user_id})
        if(!user){
            res.status(404).json({success:"false",message:"User Not Found"});
        }
        res.status(200).json({success:"True",data:user});
    }
    catch(error){
        res.status(500).json({success:"false",message:"internal server error"});
    }
}

module.exports = { createInvoice, 
                   getInvoice,
                   getByUser
                };
