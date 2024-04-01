const mongoose = require('mongoose');

const DataToConnect = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/Billing', { useNewUrlParser: true, useUnifiedTopology: true } )
        console.log('Database is connected Successfully!');
    }
    catch(error){
            res.send('Error on connecting the database',error.message);
            throw error;
    }
}

module.exports = DataToConnect; 