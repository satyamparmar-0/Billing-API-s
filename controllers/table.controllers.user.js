const Table = require('../models/table.models.user');

const Booktable = async(req,res)=>{
    try {
        const {Date,selectTime,totalGuests,fullName,email,phone,message}= req.body;
        const newTable = new Table({
            Date,
            selectTime,
            totalGuests,
            fullName,
            email,
            phone,
            message
        });
        await newTable.save();
        res.status(201).json({status:true,message:"Table Booked Successfully"});
    } catch (error) {
        res.status(500).json({success:false,message:"Internal server error "});
    }
}

const updateTable = async (req, res) => {
    try {
        const table_id = req.params.id;
        const { Date, selectTime, totalGuests, fullName, email, phone, message } = req.body;
        
        const updatedTable = await Table.findByIdAndUpdate(
            table_id,
            { Date, selectTime, totalGuests, fullName, email, phone, message },
            { new: true }
        );
        
        if (!updatedTable) {
            return res.status(404).json({ success: false, message: "Table not found" });
        }
        
        res.status(200).json({ success: true, data: updatedTable });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const deleteTable = async (req, res) => {
    try {
        const table_id = req.params.id;
        const table = await Table.findById(table_id);
        
        if (!table) {
            return res.status(404).json({ success: false, message: "Table Not Found" });
        }
        
        await Table.findByIdAndDelete(table_id);
        res.status(200).json({ success: true, message: "Table Deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getTable = async(req,res)=>{
    try {
        const tables = await Table.find();
        res.status(200).json({success:true,data:tables});
    } catch (error) {
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

module.exports = {Booktable,updateTable,deleteTable,getTable};
