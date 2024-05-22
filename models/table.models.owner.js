const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
    tableNumber: {
        type: Number,
        required: true,
        unique: true
    }
});

const TableOwner = mongoose.model('TableOwner', TableSchema);

module.exports = TableOwner;
