const TableOwner = require('../models/table.models.owner');
const Order = require('../models/orders');
const Product = require('../models/product')

const addtable = async (req,res)=>{
    const {tableNumber} = req.body;
    const table = new TableOwner({
        tableNumber
    });

    await table.save();
    res.status(200).json({success:true,message:"Created SuccessFully"});
}

const createOrderForTable = async (req, res) => {
    try {
        const { tableNumber, items } = req.body;
        let orderItems = [];
        
        // Assuming you have the product model imported and available
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

        // Assuming you have the Table model imported and available
        const table = await TableOwner.findOne({ tableNumber: tableNumber });
        if (!table) {
            return res.status(404).json({ error: 'Table not found' });
        }

        // Assuming you have the Order model imported and available
        const newOrder = new Order({
            table: table._id,
            items: orderItems,
            total_amount: totalAmount,
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createOrderForTable,
    addtable
};
