const ContactUs = require('../models/contactus');

const postContact = async(req,res)=>{
    try {
        const {name,email,mobNumber,city,restaurantName} = req.body;
        const user = new ContactUs({
            name,
            email,
            mobNumber,
            city,
            restaurantName
        });
        await user.save();
        res.status(201).json({success:true,data:user});
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getContact = async(req,res)=>{
    try{
        const user = await ContactUs.find();
        res.status({success:true,data:user});
    }
    catch(error){
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {postContact,getContact};
