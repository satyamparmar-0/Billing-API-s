const express = require('express')
const router = express.Router();
const contactUsRouter = require('../controllers/contactus');

router.get('/contactUs',contactUsRouter.getContact);
router.post('/contactUs',contactUsRouter.postContact);

module.exports = router;