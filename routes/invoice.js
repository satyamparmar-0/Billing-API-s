const express = require('express');
const router = express.Router();

const invoiceController = require('../controllers/invoice');

router.post('/createInvoice',invoiceController.createInvoice);
router.get('/getInvoice',invoiceController.getInvoice);
router.get('/getInvoiceUser',invoiceController.getByUser);

module.exports = router;
